import React from 'react';
import Dropzone from 'react-dropzone'

import ImageDialog from './ImageDialog'

// Action
import { updateImage } from '../../../client/actions/images';

export default class EditImageDialog extends ImageDialog {
  constructor(props) {
    super(props);

    // Custom the dialog for editing
    this.state.submitReady = true;
    this.state.title = "Edit image";
    this.state.submitButtonTitle = "Update";
    this.state.status = "Drop a new image or click to browse."
  }

  componentWillReceiveProps(nextProps) {
    const image = nextProps.image;
    this.setState({name: image.name, path: image.path, existingImage: image, previousImages: (image.previousImages || [])});
  }

  submit = () => {
    const { dispatch, id } = this.props;
    let imageAttributes = { name: this.state.name}

    // New image has been uploaded ?
    if (this.state.uploaded) {
      // Store the previous image info
      let previousImages = this.state.previousImages
      previousImages.push({
                            name: this.state.existingImage.name,
                            path: this.state.existingImage.path,
                            size: this.state.existingImage.size,
                            type: this.state.existingImage.type,
                            filename: this.state.existingImage.filename,
                            updatedAt: this.state.existingImage.updatedAt,
                            createdAt: this.state.existingImage.createdAt
                          })

      // Set the new pictures attributes
      imageAttributes.previousImages = previousImages
      imageAttributes.size = this.state.file.size
      imageAttributes.type = this.state.file.type
      imageAttributes.path = this.state.path
      imageAttributes.filename = this.state.file.name
    }
    dispatch(updateImage(id, imageAttributes));
  }
};
