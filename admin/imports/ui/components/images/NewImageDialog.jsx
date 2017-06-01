import React from 'react';
import Dropzone from 'react-dropzone'

import ImageDialog from './ImageDialog'
import { createImage } from '/imports/client/actions/images';

export default class NewImageDialog extends ImageDialog {
  submit = () => {
    const { dispatch } = this.props;
    const imageAttributes = { name: this.state.name,
                              path: this.state.path,
                              size: this.state.file.size,
                              type: this.state.file.type,
                              filename: this.state.file.name,
                              previousImages: []
                            }
    dispatch(createImage(imageAttributes));
  }
};
