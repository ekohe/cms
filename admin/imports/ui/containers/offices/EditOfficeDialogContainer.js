import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditOfficeDialog from '../../components/offices/EditOfficeDialog.jsx';
import { Images, Localizations } from '../../../../common/imports/collections';
import Offices from '../../../../common/imports/collections/offices';

const EditOfficeDialogContainer = createContainer(({id}) => {
  const subscription = Meteor.subscribe('offices');
  const images = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: images.ready() && subscription.ready() && localizations.ready(),
    object: Offices.findOne({_id: id}) || {},
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, EditOfficeDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.officeId
  };
}

export default connect(mapStateToProps)(EditOfficeDialogContainer);
