import React from 'react';
import * as components from '/common/imports/ui/editable_components'

import evaluatePlaceholders from '/common/imports/helpers/evaluatePlaceholders'

export default class PageComponent extends React.Component {
  render() {
    const { locale, component, collection, elements, element } = this.props

    let componentProps = component.props

    componentProps.locale = locale

    // Pass along dynamic pages data
    if (collection!=null) { componentProps.collection = collection }
    if (element!=null) { componentProps.element = element }
    if (elements!=null) { componentProps.elements = elements }

    const componentType = eval("components."+component.type)

    if (element!=null) {
      componentProps = evaluatePlaceholders(componentProps, element)
    }

    if (componentType==null) {
      console.log("Error: couldn't find component type '"+component.type+"'.")
      return null
    }

    return React.createElement(componentType, componentProps)
  }
}
