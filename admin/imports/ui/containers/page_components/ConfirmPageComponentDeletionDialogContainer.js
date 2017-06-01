import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import ConfirmPageComponentDeletionDialog from '../../components/page_components/ConfirmPageComponentDeletionDialog.jsx';

const ConfirmPageComponentDeletionDialogContainer = createContainer(({id}) => {
  return {
  };
}, ConfirmPageComponentDeletionDialog);

function mapStateToProps(state, ownProps) {
  return ownProps;
}

export default connect(mapStateToProps)(ConfirmPageComponentDeletionDialogContainer);
