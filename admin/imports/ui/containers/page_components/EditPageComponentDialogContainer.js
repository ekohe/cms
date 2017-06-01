import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Images } from '/common/imports/collections';

import EditPageComponentDialog from '../../components/page_components/EditPageComponentDialog.jsx';

const EditPageComponentDialogContainer = createContainer(({id}) => {
  const subscription = Meteor.subscribe('images');
  return {
    subscriptionReady: subscription.ready(),
    images: Images.find({}, {sort: {updatedAt: -1}}).fetch() || []
  };
}, EditPageComponentDialog);

function mapStateToProps(state, ownProps) {
  return ownProps;
}

export default connect(mapStateToProps)(EditPageComponentDialogContainer);
