import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  authorizeUser(id, authorized) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }

    return Meteor.users.update({_id: id},
                          {$set: {authorized: authorized,
                                  updatedAt: new Date()}});
  },

  deleteUser(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Meteor.users.remove(id)
  }
});
