import { Inquiries } from '/common/imports/collections';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  markInquiryAsProcessed(id, processed) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Inquiries.update({_id: id},
                          {$set: {processed: processed,
                                  updatedAt: new Date()}});
  },

  deleteInquiry(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Inquiries.remove(id)
  }
});
