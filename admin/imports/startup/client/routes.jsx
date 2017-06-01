import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux';
import Store from '../../store/store';

import AppContainer from '../../ui/containers/AppContainer';
import Welcome from '../../ui/pages/Welcome';

import MenuEntries from '../../ui/pages/MenuEntries'
import MenuSubEntries from '../../ui/pages/MenuSubEntries'
import Localizations from '../../ui/pages/Localizations'
import Pages from '../../ui/pages/Pages'
import DesignPagesContainer from '../../ui/containers/DesignPagesContainer'
import Images from '../../ui/pages/Images'
import Offices from '../../ui/pages/Offices'
import Projects from '../../ui/pages/Projects'
import TeamMembers from '../../ui/pages/TeamMembers'
import Connect from '../../ui/pages/Connect'
import PendingAuthorization from '../../ui/pages/PendingAuthorization'
import Users from '../../ui/pages/Users'
import Inquiries from '../../ui/pages/Inquiries'
import Jobs from '../../ui/pages/Jobs'
import JobApplications from '../../ui/pages/JobApplications'

const muiTheme = getMuiTheme({
  fontFamily: "kozuka-gothic-pro, helvetica, sans-serif"
});

// Create an enhanced history that syncs navigation events with the store
const store = Store
const history = syncHistoryWithStore(browserHistory, store)

Meteor.startup( () => {
  render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
          <Router history={history}>
            <Route path="/connect" component={ Connect }></Route>
            <Route path="/pending_authorization" component={ PendingAuthorization }></Route>
            <Route path="/" component={ AppContainer }>
              <IndexRoute component={ Welcome } />
                // Menu
                <Route path="menu_entries" component={ MenuEntries }>
                  <Route path="new"/>
                  <Route path=":id/edit"/>
                </Route>
                <Route path="menu_entries/:id/subentries" component={ MenuSubEntries }>
                  <Route path="new"/>
                  <Route path=":submenu_entry_id/edit"/>
                </Route>

                // Pages
                <Route path="pages" component={ Pages }>
                  <Route path="new"/>
                  <Route path=":id/edit"/>
                </Route>
                <Route path="pages/:id/design" component={ DesignPagesContainer }>
                  <Route path="add"/>
                  <Route path=":page_component_id/edit"/>
                  <Route path=":page_component_id/confirm_deletion"/>
                </Route>

                // Images
                <Route path="images" component={ Images }>
                  <Route path="new"/>
                  <Route path=":id/details"/>
                  <Route path=":id/edit"/>
                </Route>

                // Localization
                <Route path="localizations" component={ Localizations }>
                  <Route path="new"/>
                  <Route path=":id/edit"/>
                </Route>

                // Users
                <Route path="users" component={ Users }></Route>

                // Offices
                <Route path="offices" component={ Offices }>
                  <Route path="new"/>
                  <Route path=":id/edit"/>
                </Route>

                // Projects
                <Route path="projects" component={ Projects }>
                  <Route path="new"/>
                  <Route path=":id/edit"/>
                </Route>

                // Team members
                <Route path="team_members" component={ TeamMembers }>
                  <Route path="new"/>
                  <Route path=":id/edit"/>
                </Route>

                // Inquiries
                <Route path="inquiries" component={ Inquiries }>
                  <Route path=":id"/>
                </Route>

                // Jobs
                <Route path="jobs" component={ Jobs }>
                  <Route path="new"/>
                  <Route path=":id/edit"/>
                </Route>
                <Route path="jobs/:id/applications" component={ JobApplications }></Route>
            </Route>
          </Router>
      </Provider>
    </MuiThemeProvider>
    ,
    document.getElementById( 'react-root' )
  )
})
