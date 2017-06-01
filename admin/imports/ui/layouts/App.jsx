import React from 'react';

// Import UI Components
import AppBar from 'material-ui/AppBar'
import NavigationContainer from '../containers/NavigationContainer'
import SnackbarContainer from '../containers/SnackbarContainer'
import LinearProgress from 'material-ui/LinearProgress';

// Import action
import toggleNavigationVisibility from '../../client/actions/navigationVisibility'
import { browserHistory } from 'react-router'

export default class App extends React.Component {
  leftIconButtonTouched = (event) => {
    const { dispatch } = this.props;
    dispatch(toggleNavigationVisibility());
  }

  verifyAuthentication = () => {
    const {subscriptionReady, isAuthenticated, isAuthorized} = this.props;

    if (!isAuthenticated) {
      browserHistory.push('/connect');
    } else {
      if (subscriptionReady && !isAuthorized) {
        browserHistory.push('/pending_authorization');
      }
    }
  }

  componentWillMount = () => {
    this.verifyAuthentication()
  }

  componentDidUpdate = () => {
    this.verifyAuthentication()
  }

  render() {
    const {subscriptionReady, children} = this.props;

    if (!subscriptionReady) {
      return (
        <LinearProgress/>
      )
    }

    return (
      <div id="app">
        <AppBar
          title="Ekohe"
          onLeftIconButtonTouchTap={this.leftIconButtonTouched}
        />
        <div id="app-inner-container">
          <NavigationContainer />
          <div id="main">
            { children }
          </div>
        </div>
        <SnackbarContainer/>
      </div>
      )
  }
}
