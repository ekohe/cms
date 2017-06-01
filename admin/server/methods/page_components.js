import { Localizations, Pages } from '/common/imports/collections';
import isAuthorized from '/imports/helpers/isAuthorized'

function movePageComponentBy(id, componentId, positionChangeBy) {
  const page = Pages.findOne({_id: id})

  console.log("componentId: "+componentId)
  console.log("positionChangeBy: "+positionChangeBy)

  // Reorder elements
  let newComponents = page.components.sort((a, b) => a.position - b.position);
  console.log("newComponents")
  console.log(newComponents)

  // Re-assign positions
  let position = 0
  newComponents.forEach((component) => {
    component.position = (position++)
  })

  console.log("after re-assigning")
  console.log(newComponents)

  // Get current position and swap
  component = newComponents.find(c => (c._id == componentId))
  if (component==null) {
    throw new Meteor.Error('invalid-component', "Can't find component to update.");
  }

  const oldPosition = component.position
  const newPosition = component.position + positionChangeBy
  console.log("oldPosition: "+oldPosition)
  console.log("newPosition: "+newPosition)
  componentToSwap = newComponents.find(c => (c.position == newPosition))
  if (componentToSwap==null) {
    throw new Meteor.Error('invalid-component', "Can't find component to swap position with.");
  }

  // Swap positions
  componentToSwap.position = oldPosition
  component.position = newPosition

  console.log("after swapping")
  console.log(newComponents)

  return Pages.update({_id: id}, {$set: {components: newComponents}});
}

Meteor.methods({
  updatePageComponentProps(id, componentId, componentProps) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const page = Pages.findOne({_id: id})

    let newComponentsAttributes = page.components

    // Get component index in the components array looking by id
    const componentIndex = newComponentsAttributes.findIndex(component => (component._id == componentId))
    if (componentIndex==null) {
      throw new Meteor.Error('invalid-component', "Can't find component to update.");
    }

    // Update component props
    newComponentsAttributes[componentIndex].props = componentProps;

    return Pages.update({_id: id}, {$set: {components: newComponentsAttributes}});
  },

  deletePageComponent(id, componentId) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const page = Pages.findOne({_id: id})

    let newComponentsAttributes = page.components.filter(component => (component._id != componentId))

    return Pages.update({_id: id}, {$set: {components: newComponentsAttributes}});
  },

  addPageComponent(id, type) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const page = Pages.findOne({_id: id})

    let newComponentsAttributes = page.components || [];
    newComponentsAttributes.push({
      _id: Meteor.uuid(),
      position: newComponentsAttributes.length,
      type: type,
      props: {}
    });

    return Pages.update({_id: id}, {$set: {components: newComponentsAttributes}});
  },

  moveUpwardPageComponent(id, componentId) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return movePageComponentBy(id, componentId, -1)
  },

  moveDownwardPageComponent(id, componentId) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return movePageComponentBy(id, componentId, 1)
  },
});
