import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditPageDialog from '../../components/pages/EditPageDialog.jsx';
import { Pages, Localizations } from '../../../../common/imports/collections';

const EditPageDialogContainer = createContainer(({id}) => {
  const subscription = Meteor.subscribe('pages');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    object: Pages.findOne({_id: id}) || {},
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, EditPageDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.page_id
  };
}

export default connect(mapStateToProps)(EditPageDialogContainer);
