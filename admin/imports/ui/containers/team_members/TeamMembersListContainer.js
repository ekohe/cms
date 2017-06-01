import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Localizations } from '/common/imports/collections';
import TeamMembers from '../../../../common/imports/collections/team_members';
import TeamMembersList from '../../components/team_members/TeamMembersList';

const TeamMembersListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('team_members');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    collection: TeamMembers.find({}, {sort: {rank: 1}}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, TeamMembersList);

export default connect()(TeamMembersListContainer);
