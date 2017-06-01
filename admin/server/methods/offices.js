import Offices from '/common/imports/collections/offices';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createOffice(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting offices with same slug
    const office = Offices.insert({
      slug: attributes.slug,
      city: attributes.city,
      subtitle: attributes.subtitle,
      banner: attributes.banner,
      description: attributes.description,
      small_picture: attributes.small_picture,
      photo_stream: attributes.photo_stream,
      timezone: attributes.timezone,
      address: attributes.address,
      local_address: attributes.local_address,
      phone_number: attributes.phone_number,
      email: attributes.email,
      latitude: attributes.latitude,
      longitude: attributes.longitude,
      google_maps_link: attributes.google_maps_link,
      contact_id: attributes.contact_id,
      meta_description: attributes.meta_description,
      meta_keywords: attributes.meta_keywords,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return office;
  },

  updateOffice(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting offices with same slug
    return Offices.update({_id: id},
                          {$set: {slug: attributes.slug,
                                  city: attributes.city,
                                  subtitle: attributes.subtitle,
                                  banner: attributes.banner,
                                  description: attributes.description,
                                  small_picture: attributes.small_picture,
                                  photo_stream: attributes.photo_stream,
                                  timezone: attributes.timezone,
                                  address: attributes.address,
                                  local_address: attributes.local_address,
                                  phone_number: attributes.phone_number,
                                  email: attributes.email,
                                  latitude: attributes.latitude,
                                  longitude: attributes.longitude,
                                  google_maps_link: attributes.google_maps_link,
                                  contact_id: attributes.contact_id,
                                  meta_description: attributes.meta_description,
                                  meta_keywords: attributes.meta_keywords,
                                  updatedAt: new Date()}});
  },

  deleteOffice(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Offices.remove(id)
  }
});
