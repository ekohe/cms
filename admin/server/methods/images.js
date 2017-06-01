import { Images } from '/common/imports/collections';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createImage(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }

    const image = Images.insert({
      name: attributes.name,
      path: attributes.path,
      size: attributes.size,
      type: attributes.type,
      filename: attributes.filename,
      previousImages: attributes.previousImages,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return image;
  },
  updateImage(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    let attributesToUpdate = {name: attributes.name, updatedAt: new Date()}

    if (attributes.path!=null) {
      attributesToUpdate.path = attributes.path
    }
    if (attributes.size!=null) {
      attributesToUpdate.size = attributes.size
    }
    if (attributes.type!=null) {
      attributesToUpdate.type = attributes.type
    }
    if (attributes.filename!=null) {
      attributesToUpdate.filename = attributes.filename
    }
    if (attributes.previousImages!=null) {
      attributesToUpdate.previousImages = attributes.previousImages
    }

    return Images.update({_id: id}, {$set: attributesToUpdate});
  },
  deleteImage(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Images.remove(id)
  }
});
