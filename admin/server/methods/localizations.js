import { Localizations } from '/common/imports/collections';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createLocalization(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // Try to find an existing localization
    let existingLocalization = Localizations.find({locale: attributes.locale}).fetch()[0]
    if (existingLocalization!=null) {
      throw new Meteor.Error('invalid-localization', "Locale is already taken.");
    }

    const localization = Localizations.insert({
      position: attributes.position,
      name: attributes.name,
      native_name: attributes.native_name,
      locale: attributes.locale,
      default: attributes.default,
      iso6391_code: attributes.iso6391_code,
      createdAt: new Date()
    });

    return localization;
  },
  updateLocalization(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // Try to find an existing localization with the same locale code
    let existingLocalization = Localizations.find({_id: {$ne: id}, locale: attributes.locale}).fetch()[0]
    if (existingLocalization!=null) {
      throw new Meteor.Error('invalid-localization', "Locale is already taken.");
    }

    // Try to find an existing localization that is also set to default
    if (attributes.default) {
      let defaultLocalization = Localizations.find({_id: {$ne: id}, default: true}).fetch()[0]
      if (defaultLocalization!=null) {
        throw new Meteor.Error('invalid-localization', "There's already a default localization: "+defaultLocalization.name);
      }
    }

    return Localizations.update({_id: id}, {$set: {position: attributes.position, name: attributes.name, native_name: attributes.native_name, locale: attributes.locale, iso6391_code: attributes.iso6391_code, default: attributes.default}});
  },
  deleteLocalization(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Localizations.remove(id)
  }
});
