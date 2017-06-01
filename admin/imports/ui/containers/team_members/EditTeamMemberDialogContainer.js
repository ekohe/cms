import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditTeamMemberDialog from '../../components/team_members/EditTeamMemberDialog.jsx';
import { Images, Localizations } from '../../../../common/imports/collections';
import TeamMembers from '../../../../common/imports/collections/team_members';

const EditTeamMemberDialogContainer = createContainer(({id}) => {
  const subscription = Meteor.subscribe('team_members');
  const images = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: images.ready() && subscription.ready() && localizations.ready(),
    object: TeamMembers.findOne({_id: id}) || {},
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, EditTeamMemberDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.officeId
  };
}

export default connect(mapStateToProps)(EditTeamMemberDialogContainer);
