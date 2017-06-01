import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

// Components
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';

// Helpers
import { browserHistory } from 'react-router'

class PendingAuthorization extends React.Component {
  verifyAuthentication = () => {
    const {subscriptionReady, user, isAuthenticated, isAuthorized} = this.props;

    if ((!isAuthenticated) || (user==null)) {
      browserHistory.push('/connect');
    } else {
      if (subscriptionReady && isAuthorized) {
        browserHistory.push('/');
      }
    }
  }

  componentWillMount = () => {
    this.verifyAuthentication()
  }

  componentDidUpdate = () => {
    this.verifyAuthentication()
  }

  componentWillReceiveProps(nextProps) {
    this.verifyAuthentication()
  }

  onDisconnect() {
    Meteor.logout(function(err) {
      if (err) {
        // TODO Need to do something here with the error...
        console.log('Error: ', err);
      } else {
        browserHistory.push('/connect');
      }
    })
  }

  render() {
    const { user, subscriptionReady } = this.props
    if (!subscriptionReady) {
      return (
        <LinearProgress/>
      )
    }
    const floatingButtonStyle = {
      float: 'right',
      marginRight: 40,
      marginTop: 20,
    };

    const userEmail = (user==null) ? '' : user.services.google.email

    return (<div className="pending_authorization">
      <h1>One more step...</h1>
      <p>
        Please contact the site administrator to authorize your account {"'"+userEmail+"'"}.<br/>
        Once approved, you'll be automatically be redirected.
      </p>
      <RaisedButton
        label="Disconnect"
        onTouchTap={this.onDisconnect}
      />
    </div>)
  }
}

const PendingAuthorizationContainer = createContainer(() => {
  const userDataSubscription = Meteor.subscribe('userData');
  return {
    subscriptionReady: userDataSubscription.ready(),
    user: Meteor.user(),
    isAuthenticated: (Meteor.userId() !== null),
    isAuthorized: ((Meteor.userId() !== null) && (Meteor.user() && Meteor.user().authorized))
  };
}, PendingAuthorization);

export default connect()(PendingAuthorizationContainer);
