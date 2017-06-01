import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import UsersList from '../../components/users/UsersList';

const UsersListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('allUsers');
  return {
    subscriptionReady: subscription.ready(),
    users: Meteor.users.find({}).fetch() || []
  };
}, UsersList);

export default connect()(UsersListContainer);
