import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditImageDialog from '../../components/images/EditImageDialog.jsx';
import { Images } from '../../../../common/imports/collections';

const EditImageDialogContainer = createContainer(({id}) => {
  const imagesSub = Meteor.subscribe('images');
  return {
    imagesSubReady: imagesSub.ready(),
    image: Images.findOne({_id: id}) || {name: '', path: '', file: {}}
  };
}, EditImageDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.imageId
  };
}

export default connect(mapStateToProps)(EditImageDialogContainer);
