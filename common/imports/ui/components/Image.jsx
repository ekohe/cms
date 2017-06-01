import React from 'react';
import { Images } from '/common/imports/collections';

export default class Image extends React.Component {
  render() {
    const { imageName, imageId, alt } = this.props
    let image = null

    if (imageName!=null) { image = Images.find({name: imageName}).fetch()[0] }
    if (imageId!=null) { image = Images.find({_id: imageId}).fetch()[0] }

    let altAttribute = alt || imageName

    if (image!=null) {
      return ( <img src={Meteor.settings.public.cdn + image.path} alt={altAttribute}/> )
    } else {
      return null
    }
  }
}
