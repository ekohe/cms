import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import AddPageComponentDialog from '../../components/page_components/AddPageComponentDialog.jsx';

const AddPageComponentDialogContainer = createContainer(({id}) => {
  return {
  };
}, AddPageComponentDialog);

function mapStateToProps(state, ownProps) {
  return ownProps;
}

export default connect(mapStateToProps)(AddPageComponentDialogContainer);
