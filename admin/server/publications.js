import { Meteor } from 'meteor/meteor';
import { Localizations, MenuEntries, Pages, Images, Inquiries } from '../common/imports/collections';

// Import the 'editable' collections
import * as collections from '/common/imports/collections/index'

Meteor.publish('userData', function() {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {authorized: 1, profile: 1, services: 1}})
  } else {
    return this.ready()
  }
});

Meteor.publish('allUsers', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return Meteor.users.find({}, {sort: {createdAt: -1}});
    }
  }
  return this.ready()
});

Meteor.publish('localizations', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return Localizations.find({}, {sort: {position: 1}});
    }
  }
  return this.ready()
});

Meteor.publish('menu_entries', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return MenuEntries.find({}, {sort: {position: 1}});
    }
  }
  return this.ready()
});

Meteor.publish('pages', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return Pages.find({});
    }
  }
  return this.ready()
});

Meteor.publish('images', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return Images.find({}, {sort: {updatedAt: -1}});
    }
  }
  return this.ready()
});

Meteor.publish('offices', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return collections.Offices.find({});
    }
  }
  return this.ready()
});

Meteor.publish('projects', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return collections.Projects.find({});
    }
  }
  return this.ready()
});

Meteor.publish('team_members', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return collections.TeamMembers.find({}, {sort: {rank: 1}});
    }
  }
  return this.ready()
});

Meteor.publish('inquiries', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return Inquiries.find({});
    }
  }
  return this.ready()
});

Meteor.publish('jobs', function() {
  if (this.userId) {
    var user = Meteor.users.findOne(this.userId);
    if (user.authorized) {
      return collections.Jobs.find({});
    }
  }
  return this.ready()
});
