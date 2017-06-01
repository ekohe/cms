import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Images, Localizations } from '/common/imports/collections';
import ImagesList from '../../components/images/ImagesList';

const ImagesListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('images');
  return {
    subscriptionReady: subscription.ready(),
    collection: Images.find({}, {sort: {updatedAt: -1}}).fetch() || []
  };
}, ImagesList);

export default connect()(ImagesListContainer);
