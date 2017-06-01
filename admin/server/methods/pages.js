import { Pages } from '/common/imports/collections';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createPage(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // Try to find an existing localization
    let existingPage = Pages.find({slug: attributes.slug}).fetch()[0]
    if (existingPage!=null) {
      throw new Meteor.Error('invalid-slug', "Slug is already taken.");
    }

    if ((attributes.status==null) || (attributes.status=="")) {
      throw new Meteor.Error('invalid-status', "Status cannot be empty.");
    }

    const page = Pages.insert({
      title: attributes.title,
      slug: attributes.slug,
      collection: attributes.collection,
      type: attributes.type,
      status: attributes.status,
      meta_description: attributes.meta_description,
      meta_keywords: attributes.meta_keywords,
      json_ld: attributes.json_ld,
      html_class: attributes.html_class,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return page;
  },
  updatePage(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Pages.update({_id: id}, {$set: {title: attributes.title,
                                           slug: attributes.slug,
                                           collection: attributes.collection,
                                           type: attributes.type,
                                           status: attributes.status,
                                           meta_description: attributes.meta_description,
                                           meta_keywords: attributes.meta_keywords,
                                           json_ld: attributes.json_ld,
                                           html_class: attributes.html_class,
                                           updatedAt: new Date()}});
  },
  deletePage(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Pages.remove(id)
  }
});
