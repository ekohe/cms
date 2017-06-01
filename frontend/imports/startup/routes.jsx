import React from 'react';
import { render } from 'react-dom';

// Theme
import getTheme from './theme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Pages, Localizations } from '/common/imports/collections';
import TeamMembers from '/common/imports/collections/team_members';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

// Import pages and components
import AppContainer from '../ui/containers/AppContainer';
import PageContainer from '../ui/containers/PageContainer';
import StyleGuide from '../ui/components/StyleGuide';
import ReactHelmet from 'react-helmet';

// Create an enhanced history that syncs navigation events with the store
let history;
let cssCache = {};

const setupRouting = () => {
  const defaultLocalization = Localizations.find({default: true}).fetch()[0]
  const nonDefaultLocalizations = Localizations.find({default: {$ne:true}}).fetch()
  const pages = Pages.find({}).fetch()
  const pagesButTheHomepage = Pages.find({slug: {$ne: ''}}).fetch()
  const members = TeamMembers.find({}).fetch()

  const routes = (
    <Route path="/" component={ AppContainer }>
      <IndexRoute component={ PageContainer } locale={defaultLocalization ? defaultLocalization.locale : null}/>

      {members.map((member) =>
        <Redirect status={301} key={"member_redirect_"+member._id} from={"people/" + member.slug} to={member.slug}/>
      )}

      {pagesButTheHomepage.map((page) =>
        <Route key={page._id} path={page.slug} pageSlug={page.slug} locale={defaultLocalization ? defaultLocalization.locale : null} component={PageContainer}/>
      )}

      {nonDefaultLocalizations.map((localization) =>
        <Route key={"home_"+localization._id} path={localization.locale} locale={localization.locale} pageSlug="" component={PageContainer}>
          <IndexRoute component={ PageContainer } locale={localization.locale}/>
          {members.map((member) =>
            <Redirect status={301} key={"member_redirect_"+member._id} from={"people/" + member.slug} to={member.slug}/>
          )}
          {pagesButTheHomepage.map((page) =>
            <Route key={localization._id+"_"+page._id} path={page.slug} locale={localization.locale} pageSlug={page.slug} component={PageContainer}/>
          )}
          {members.map((member) =>
            <Route key={"member_"+member._id} path={member.slug} slug={member.slug} pageSlug="people/:slug" component={PageContainer} locale={localization.locale}/>
          )}
          <Route key={"404_"+localization._id} path="*" pageSlug="404" locale={localization.locale} component={PageContainer} />
        </Route>
      )}

      {defaultLocalization && pages.map((page) =>
        <Redirect key={defaultLocalization._id+"_"+page._id} from={"/"+defaultLocalization.locale + "/" + page.slug} to={"/"+page.slug}/>
      )}

      {members.map((member) =>
        <Route key={"member_"+member._id} path={member.slug} slug={member.slug} pageSlug="people/:slug" component={PageContainer} locale={defaultLocalization ? defaultLocalization.locale : null}/>
      )}

      <Route path="styleguide" component={ StyleGuide } locale={defaultLocalization ? defaultLocalization.locale : null}/>

      <Route path="*" pageSlug="404" locale={defaultLocalization.locale} component={PageContainer} />

    </Route>
  )

  const wrapperHook = app => {
    return <MuiThemeProvider muiTheme={getTheme()}>{app()}</MuiThemeProvider>
  }

  const preRender = (req, res) => {
    const {headers} = req;

    global.navigator = {
      userAgent: headers['user-agent']
    };
  }

  const htmlHook = (html) => {
    // Header
    const head = ReactHelmet.rewind();
    html = html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link);
    html = html.replace('<html>', '<html '+head.htmlAttributes+'>')

    // Don't go any further in development
    if (process.env.NODE_ENV=='development') { return html; }

    // Make all the script aync
    html = html.replace(/<script /g, '<script async ')

    // In production, replace CSS <link/>s by their content for faster page rendering
    html = html.replace(/<link rel=\"stylesheet\"[^\>]* href=\"\/(.*)\?[^\"]*">/, function(cssLink) {
      const cssUrl = cssLink.match(/<link rel=\"stylesheet\"[^\>]* href=\"\/(.*)\?[^\"]*">/)[1]

      if (cssCache[cssUrl]==null) {
        var Path = Npm.require("path");
        var fs = Npm.require('fs');
        const absolutePath = Path.join(
                                Path.dirname(
                                  Path.join(
                                    __meteor_bootstrap__.serverDir,
                                    __meteor_bootstrap__.configJson.clientPaths['web.browser']
                                  )
                                ),
                                cssUrl
                              )

        cssCache[cssUrl] = fs.readFileSync(absolutePath)
      }
      return "<style>"+cssCache[cssUrl]+"</style>"
    })

    return html;
  }

  const onUpdate = () => {
    window.routerUpdateCount = (window.routerUpdateCount + 1)
    // If there is no hash, go to top, unless if it's the first render
    if (window.location.hash == '') {
      if (window.routerUpdateCount>1) {
        window.scrollTo(0, 0)
      }
    }else{
      setTimeout(function(){
        window.location.href = window.location.href;
      }, 50)
    }
    // Notify the page has been changed to Google Analytics
    if (typeof(ga)!='undefined') { ga('send', 'pageview'); }
    if (typeof(window.Intercom)!='undefined') { window.Intercom("update"); }
  }

  const clientOptions = { wrapperHook, props: {onUpdate} };
  const serverOptions = { preRender, htmlHook };

  ReactRouterSSR.Run(routes, clientOptions, serverOptions);
}

Meteor.startup( () => {
  if (Meteor.isClient) {
    window.routerUpdateCount = 0
    // On the client, wait for data to arrive before setting up router
    let pagesReady = false
    let localizationsReady = false
    let membersReady = false
    let menuEntriesReady = false
    let imagesReady = false
    let projectsReady = false
    let officesReady = false

    function isReady() {
      return (localizationsReady && membersReady && menuEntriesReady && imagesReady && pagesReady && projectsReady && officesReady)
    }

    function setupRoutingIfReady() {
      if (isReady()) { setupRouting() }
    }

    Meteor.subscribe("pages", {
      onReady: function () {
        pagesReady = true
        setupRoutingIfReady()
      }
    });

    Meteor.subscribe("localizations", {
      onReady: function () {
        localizationsReady = true
        setupRoutingIfReady()
      }
    });

    Meteor.subscribe("TeamMembers", {
      onReady: function () {
        membersReady = true
        setupRoutingIfReady()
      }
    });

    Meteor.subscribe("menu_entries", {
      onReady: function () {
        menuEntriesReady = true
        setupRoutingIfReady()
      }
    });

    Meteor.subscribe("images", {
      onReady: function () {
        imagesReady = true
        setupRoutingIfReady()
      }
    });

    Meteor.subscribe("Projects", {
      onReady: function () {
        projectsReady = true
        setupRoutingIfReady()
      }
    });

    Meteor.subscribe("Offices", {
      onReady: function () {
        officesReady = true
        setupRoutingIfReady()
      }
    });

    // Load Google Analytics
    if (Meteor.settings.public.google_analytics_property_id!=null) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', Meteor.settings.public.google_analytics_property_id, 'auto');
      ga('send', 'pageview');
    }
    return null
  } else {
    // On the server, no need to subscribe
    setupRouting()
  }
})
