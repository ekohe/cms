import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import ImageDetailsDialog from '../../components/images/ImageDetailsDialog.jsx';
import { Images } from '../../../../common/imports/collections';

const ImageDetailsDialogContainer = createContainer(({id}) => {
  const imagesSub = Meteor.subscribe('images');
  return {
    imagesSubReady: imagesSub.ready(),
    image: Images.findOne({_id: id}) || {name: '', path: '', file: {}}
  };
}, ImageDetailsDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.imageId
  };
}

export default connect(mapStateToProps)(ImageDetailsDialogContainer);
