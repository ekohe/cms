import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditJobDialog from '../../components/jobs/EditJobDialog.jsx';
import { Images, Localizations } from '../../../../common/imports/collections';
import Jobs from '../../../../common/imports/collections/jobs';

const EditJobDialogContainer = createContainer(({id}) => {
  const subscription = Meteor.subscribe('jobs');
  const images = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: images.ready() && subscription.ready() && localizations.ready(),
    object: Jobs.findOne({_id: id}) || {},
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, EditJobDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.jobId
  };
}

export default connect(mapStateToProps)(EditJobDialogContainer);
