import React from 'react';

export default class ImageDetails extends React.Component {
  render() {
    const { image } = this.props;
    return (
      <dl>
        <dt>ID:</dt>
        <dd>{image._id}</dd>

        <dt>Name:</dt>
        <dd>{image.name}</dd>

        <dt>URL:</dt>
        <dd><a href={Meteor.settings.public.cdn + image.path} target="_blank">{Meteor.settings.public.cdn + image.path}</a></dd>

        <dt>Preview:</dt>
        <dd><img alt={image.name} src={Meteor.settings.public.cdn + image.path} className="image_details_preview"/></dd>

        <dt>Size:</dt>
        <dd>{image.size}</dd>

        <dt>Updated at:</dt>
        <dd>{image.updatedAt ? image.updatedAt.toString() : null}</dd>

        <dt>Created at:</dt>
        <dd>{image.createdAt ? image.createdAt.toString() : null}</dd>
      </dl>
    )
  }
}
