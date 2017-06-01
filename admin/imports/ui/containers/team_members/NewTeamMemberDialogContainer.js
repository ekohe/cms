import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Images, Localizations } from '../../../../common/imports/collections';
import NewTeamMemberDialog from '../../components/team_members/NewTeamMemberDialog.jsx';

const NewTeamMemberDialogContainer = createContainer(() => {
  const images = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: images.ready() && localizations.ready(),
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, NewTeamMemberDialog);

export default connect()(NewTeamMemberDialogContainer);
