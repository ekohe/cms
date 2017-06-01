export const Localizations = new Mongo.Collection('localizations');

Localizations.default = function() {
  return Localizations.find({default: true}).fetch()[0];
}

export const MenuEntries = new Mongo.Collection('menu_entries');

export const Pages = new Mongo.Collection('pages');

export const Images = new Mongo.Collection('images');

export const Inquiries = new Mongo.Collection('inquiries');
