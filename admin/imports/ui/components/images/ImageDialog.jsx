import React from 'react';
import Dropzone from 'react-dropzone'

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

import { Link } from 'react-router';

// Actions
import { createImage } from '/imports/client/actions/images';

// Helpers
import humanizeString from '/common/imports/helpers/humanizeString';


export default class ImageDialog extends React.Component {
  state = {
    status: "Drop an image or click to browse.",
    uploading: false,
    uploaded: false,
    progress: 0,
    name: "",
    title: "Upload a new image",
    submitButtonTitle: "Create",
    submitReady: false,
    existingImage: null
  }

  onDrop = (files) => {
    // Only one file drop allowed
    if (this.state.file!=null) {
      return;
    }

    // Only expect one file
    const file = files[0]

    var uploader = new Slingshot.Upload("images");

    // Validate the file
    var error = uploader.validate(file)
    if (error) {
      this.setState({status: error.toString()})
      return
    }

    // Create a name, removing extension from the filename when creating a new image
    const name = this.state.existingImage ? this.state.name : humanizeString(file.name.replace(/\.[^/.]+$/, ""))

    this.setState({name, file, status: "Uploading...", uploading: true})

    // Start upload
    uploader.send(file, (error, downloadUrl) => {
      // Stop progress tracking on upload finish
      computation.stop();

      if (error) {
        this.setState({file, status: "Upload error: "+uploader.xhr.response, uploading: false})
      } else {
        const path = downloadUrl.slice(Meteor.settings.public.cdn.length)
        this.setState({file, path, status: "Upload success!", uploading: false, uploaded: true, submitReady: true})
      }
    });

    // Track upload progress
    let computation = Tracker.autorun(() => {
        if(!isNaN(uploader.progress())) {
          this.setState({ progress: uploader.progress() * 100 });
        }
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/images"/>}
      />,
      <FlatButton
        label={this.state.submitButtonTitle}
        primary={true}
        containerElement={<a/>}
        onTouchTap={this.submit}
        disabled={!this.state.submitReady}
      />,
  ];

    const progressStyle = {
      width: "50%",
      marginLeft: "25%",
      marginTop: "20px"
    }

    const topLabelStyle = {
      marginTop: "20px"
    }

    return (
      <div>
        <Dialog
            title={this.state.title}
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <div style={topLabelStyle}>
            Image
          </div>
          <Dropzone
              onDrop={this.onDrop}
              multiple={false}
              className="dropzone"
              ref="dropzone"
              disableClick={this.state.file!=null}
          >
            {this.state.file ? <div className="imagePreview"><img src={this.state.file.preview} /></div> : null}
            {(this.state.existingImage && (this.state.file==null)) ? <div className="imagePreview"><img src={Meteor.settings.public.cdn + this.state.existingImage.path} /></div> : null}
            {!this.state.uploaded ? <div className="status">
              {this.state.status}
              {this.state.uploading ? <LinearProgress mode="determinate" value={this.state.progress} style={progressStyle}/> : null}
            </div> : null }
          </Dropzone>
          <TextField
            floatingLabelText="Image name"
            fullWidth={true}
            value={this.state.name}
            onChange={(event) => this.setState({'name': event.target.value})}
          />
        </Dialog>
      </div>
    );
  }
};
