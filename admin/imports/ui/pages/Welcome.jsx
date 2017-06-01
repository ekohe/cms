import React from 'react';

// Components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EjectIcon from 'material-ui/svg-icons/action/eject';

// Helpers
import { browserHistory } from 'react-router'

export default class Welcome extends React.Component {
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
    const floatingButtonStyle = {
      float: 'right',
      marginRight: 40,
      marginTop: 20,
    };

    return (
      <div>
        <FloatingActionButton mini={true} secondary={true} style={floatingButtonStyle} onTouchTap={this.onDisconnect}>
            <EjectIcon/>
        </FloatingActionButton>
        <h1>Welcome</h1>
      </div>
    )
  }
}
