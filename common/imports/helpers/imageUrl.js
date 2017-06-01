import { Images } from '/common/imports/collections';

export default function imageUrl(imageId) {
  const image = Images.find({_id: imageId}).fetch()[0]
  if (image!=null) {
    return Meteor.settings.public.cdn + image.path
  } else {
    return null
  }
}
