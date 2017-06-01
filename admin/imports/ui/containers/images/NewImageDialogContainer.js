import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import NewImageDialog from '../../components/images/NewImageDialog.jsx';

const NewImageDialogContainer = createContainer(() => {
  return {};
}, NewImageDialog);

export default connect()(NewImageDialogContainer);
