import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import App from '../layouts/App'

const AppContainer = createContainer(() => {
  const userDataSubscription = Meteor.subscribe('userData');
  return {
    subscriptionReady: userDataSubscription.ready(),
    user: Meteor.user(),
    isAuthenticated: (Meteor.userId() !== null),
    isAuthorized: ((Meteor.userId() !== null) && (Meteor.user() && Meteor.user().authorized))
  };
}, App);

export default connect()(AppContainer);
