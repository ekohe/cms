import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditProjectDialog from '../../components/projects/EditProjectDialog.jsx';
import { Images, Localizations } from '../../../../common/imports/collections';
import Projects from '../../../../common/imports/collections/projects';

const EditProjectDialogContainer = createContainer(({id}) => {
  const subscription = Meteor.subscribe('projects');
  const images = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: images.ready() && subscription.ready() && localizations.ready(),
    object: Projects.findOne({_id: id}) || {},
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, EditProjectDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.officeId
  };
}

export default connect(mapStateToProps)(EditProjectDialogContainer);
