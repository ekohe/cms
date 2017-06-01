import { MenuEntries } from '/common/imports/collections';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createMenuEntry(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const menu_entry = MenuEntries.insert({
      name: attributes.name,
      position: parseInt(attributes.position),
      url: attributes.url,
      createdAt: new Date()
    });

    return menu_entry;
  },
  updateMenuEntry(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return MenuEntries.update({_id: id}, {$set: {name: attributes.name, position: parseInt(attributes.position), url: attributes.url}});
  },
  deleteMenuEntry(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return MenuEntries.remove(id)
  },
  createSubMenuEntry(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const subMenuEntry = {_id: Meteor.uuid(),
                          name: attributes.name,
                          position: parseInt(attributes.position),
                          url: attributes.url,
                          createdAt: new Date(),
                          updatedAt: new Date()}
    return MenuEntries.update({_id: id}, {$push: {children: subMenuEntry}});
  },
  deleteSubMenuEntry(menuEntryId, subMenuEntryId) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const menuEntry = MenuEntries.findOne({_id: menuEntryId})

    let children = menuEntry.children.filter(subentry => (subentry._id != subMenuEntryId))

    return MenuEntries.update({_id: menuEntryId}, {$set: {children: children, updatedAt: new Date()}});
  },
  updateSubMenuEntry(menuEntryId, subMenuEntryId, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const menuEntry = MenuEntries.findOne({_id: menuEntryId})

    const oldSubMenuEntry = menuEntry.children.filter(subentry => (subentry._id == subMenuEntryId))[0]
    let children = menuEntry.children.filter(subentry => (subentry._id != subMenuEntryId))

    const subMenuEntry = {_id: subMenuEntryId,
                          name: attributes.name,
                          position: parseInt(attributes.position),
                          url: attributes.url,
                          createdAt: oldSubMenuEntry.createdAt || new Date(),
                          updatedAt: new Date()}

    children.push(subMenuEntry)

    return MenuEntries.update({_id: menuEntryId}, {$set: {children: children, updatedAt: new Date()}});
  }
});
