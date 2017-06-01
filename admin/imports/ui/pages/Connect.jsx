import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

// Components
import RaisedButton from 'material-ui/RaisedButton';

// Helpers
import { browserHistory } from 'react-router'

class Connect extends React.Component {
  onConnect() {
    Meteor.loginWithGoogle({}, function(err) {
      if (err) {
        // TODO Need to do something here with the error...
        console.log('Error: ', err);
      } else {
        browserHistory.push('/');
      }
    })
  }
  render() {
    return (<div className="connect">
      <RaisedButton
        label="Connect with Google"
        onTouchTap={this.onConnect}
        primary={true}
      />
    </div>)
  }
}

const ConnectContainer = createContainer(() => {
  console.log("Meteor.userId()")
  console.log(Meteor.userId())
  return {
    isAuthenticated: Meteor.userId() !== null
  };
}, Connect);

export default connect()(ConnectContainer);
