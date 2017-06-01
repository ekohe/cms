import { Meteor } from 'meteor/meteor';
import { Localizations, MenuEntries, Pages, Images } from '/common/imports/collections';

// Import the 'editable' collections
import * as collections from '/common/imports/collections/index'

Meteor.publish('localizations', function() {
   return Localizations.find({}, {sort: {position: 1}});
});

Meteor.publish('menu_entries', function() {
   return MenuEntries.find({}, {sort: {position: 1}});
});

Meteor.publish('pages', function() {
   return Pages.find({'status': 'published'});
});

Meteor.publish('images', function() {
   return Images.find({});
});

Meteor.publish('Offices', function() {
   return collections.Offices.find({});
});

Meteor.publish('Projects', function() {
   return collections.Projects.find({});
});

Meteor.publish('TeamMembers', function() {
   return collections.TeamMembers.find({}, {sort: {rank: 1}});
});

Meteor.publish('Jobs', function() {
   return collections.Jobs.find({'published': true}, {fields: {job_applications: false}});
});
