import { Inquiries } from '/common/imports/collections';

Meteor.methods({
  createInquiry(attributes) {
    const inquiry = Inquiries.insert({
      name: attributes.name,
      email: attributes.email,
      subject: attributes.subject,
      message: attributes.message,
      url: attributes.url,
      ip_address: this.connection.httpHeaders['x-real-ip'],
      user_agent: attributes.user_agent,
      locale: attributes.locale,
      timezone_offset: attributes.timezone_offset,
      pageViews: attributes.pageViews,
      visits: attributes.visits,
      attachments: attributes.attachments,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return inquiry;
  },

  updateInquiry(id, attributes) {
    let attributesToUpdate = {ip_address: this.connection.clientAddress, updatedAt: new Date()}

    if (attributes.name!=null) {
      attributesToUpdate.name = attributes.name
    }
    if (attributes.email!=null) {
      attributesToUpdate.email = attributes.email
    }
    if (attributes.subject!=null) {
      attributesToUpdate.subject = attributes.subject
    }
    if (attributes.message!=null) {
      attributesToUpdate.message = attributes.message
    }
    if (attributes.url!=null) {
      attributesToUpdate.url = attributes.url
    }
    if (attributes.user_agent!=null) {
      attributesToUpdate.user_agent = attributes.user_agent
    }
    if (attributes.locale!=null) {
      attributesToUpdate.locale = attributes.locale
    }
    if (attributes.timezoneOffset!=null) {
      attributesToUpdate.timezoneOffset = attributes.timezoneOffset
    }
    if (attributes.pageViews!=null) {
      attributesToUpdate.pageViews = attributes.pageViews
    }
    if (attributes.visits!=null) {
      attributesToUpdate.visits = attributes.visits
    }

    if (attributes.attachments!=null) {
      attributesToUpdate.attachments = attributes.attachments
    }

    return Inquiries.update({_id: id}, {$set: attributesToUpdate});
  }
});
