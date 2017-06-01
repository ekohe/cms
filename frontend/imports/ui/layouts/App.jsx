import React from 'react';

import NavigationContainer from '../containers/NavigationContainer';
import MobileNavigationContainer from '../containers/MobileNavigationContainer';
import LinearProgress from 'material-ui/LinearProgress';
import FooterContainer from '../containers/FooterContainer';

export default class App extends React.Component {
  render() {
    const {children, routes, location} = this.props;

    const locale = routes[routes.length-1].locale

    return (
      <div id="main" className={locale}>
        <div className='desktop_navigation'>
          <NavigationContainer locale={locale} location={location}/>
        </div>
        <MobileNavigationContainer locale={locale} location={location}/>
        <div className="content">
          { children }
        </div>
        <FooterContainer locale={locale} location={location}/>
      </div>
    )
  }
}
