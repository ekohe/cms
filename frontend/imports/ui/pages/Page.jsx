import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { Localizations, Pages } from '/common/imports/collections';
import PageComponent from '../components/PageComponent'
import Helmet from 'react-helmet';

// Import the 'editable' collections
import * as collections from '/common/imports/collections/index'

// Helpers
import evaluatePlaceholders from '/common/imports/helpers/evaluatePlaceholders'
import { rebuildRouteWithLocale } from '/common/imports/routing';

export default class Page extends React.Component {
  componentWillMount() {
    const { locale, routes, dispatch, subscriptionReady } = this.props;

    const currentLocale = locale
    const localeFromRouter = routes[routes.length-1].locale
  }

  render() {
    const { routes, params, location, dispatch, pages, localizations, subscriptionReady } = this.props;

    if (!subscriptionReady) {
      return (
        <LinearProgress/>
      )
    }

    const route = routes[routes.length-1]
    const locale = route.locale
    const pageSlug = route.pageSlug || ''
    const elementSlug = params.slug || route.slug
    const pathname = location.pathname

    // Get page by slug
    const page = Pages.find({slug: pageSlug}).fetch()[0]

    if (page==null) {
      console.log("Couldn't find a page with the slug: "+pageSlug);
      return (<div><h1>Not Found</h1></div>)
    }

    let collection = null
    if (((page.type=='element') || (page.type=='collection')) && (page.collection!=null)) {
      collection = eval("collections."+page.collection)
    }

    let element = null
    if ((page.type=='element') && (page.collection!=null)) {
      // Need to find element from the collection
      element = collection.find({slug: elementSlug}).fetch()[0]
    }

    let elements = null
    if ((page.type=='collection') && (page.collection!=null)) {
      // Need to find elements from the collection
      elements = collection.find({}).fetch()
    }

    let meta = {"title": page.title ? page.title[locale] : '',
                "description": page.meta_description ? page.meta_description[locale] : '',
                "keywords": page.meta_keywords ? page.meta_keywords[locale] : ''}
    if (element!=null) {
      meta = evaluatePlaceholders(meta, element)
    }

    const htmlClass = (page.html_class || '')

    const titles = {
      'en': 'Ekohe',
      'fr': 'Ekohe',
      'cn': '易空海 | Ekohe',
      'jp': 'イコヒー | Ekohe'
    }

    const links = localizations.filter(localization => localization.locale!=locale).map(function(localization) {return {"rel": "alternate", 'hreflang': localization.iso6391_code, 'href': rebuildRouteWithLocale(pathname, localization.locale)}})
    const currentLocalization = localizations.filter(localization => localization.locale==locale)[0]
    const iso6391Code = (currentLocalization ? currentLocalization.iso6391_code : 'en')

    let jsonLdElement = null
    if (page.json_ld && page.json_ld[locale]) {
      let jsonLd = page.json_ld[locale]
      if (element!=null) {
        jsonLd = evaluatePlaceholders(jsonLd, element)
      }
      jsonLdElement = <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd}}/>
    }

    return (
      <div>
        <Helmet
          title={meta.title}
          titleTemplate={"%s | "+titles[locale]}
          htmlAttributes={{"lang": iso6391Code, "class": htmlClass}}
          meta={[
            {"name": "description", "content": meta.description },
            {"name": "keywords", "content": meta.keywords }
          ]}
          link={links}
        />
        {jsonLdElement}
        {(page.components||[]).sort((a, b) => a.position - b.position).map(component =>
            <PageComponent
              key={"component_"+(component._id)}
              component={component}
              locale={locale}
              collection={collection}
              element={element}
              elements={elements}
            />)}
      </div>)
  }
}
