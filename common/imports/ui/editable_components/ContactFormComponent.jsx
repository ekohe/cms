import React from 'react';
import Dropzone from 'react-dropzone';
import Linkify from 'react-linkify'

import translatedStringProp from '/common/imports/properties/translatedStringProp';

import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline';
import HighlightOffIcon from 'material-ui/svg-icons/action/highlight-off';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import LinearProgress from 'material-ui/LinearProgress';

import CenteredImageComponent from './CenteredImageComponent'

// Helpers
import translationExists from '/common/imports/helpers/translationExists';
import nl2br from '/common/imports/helpers/nl2br'

export default class ContactFormComponent extends React.Component {
  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
    attachments: [],
    files: [],
    liveValidation: false,
    errors: {
      email: null,
      files: []
    },
    thankYouDialogOpened: false
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  validate = () => {
    const { locale, emailLabel, emailMissingErrorMessage, emailInvalidErrorMessage } = this.props

    // Validate if an email has been entered
    if ((this.state.email=='') &&
         translationExists(emailLabel, locale) &&
         translationExists(emailMissingErrorMessage, locale)) {
      $('.email-field').removeClass('valid');
      $('.email-field').addClass('error');
      if ((this.state.errors.email!=emailMissingErrorMessage[locale])) {
        this.setState({errors: {email: emailMissingErrorMessage[locale]}})
      }
      return false;
    }

    // Validate if the email format is valid
    if ((this.validateEmail(this.state.email)==false) &&
         translationExists(emailLabel, locale) &&
         translationExists(emailInvalidErrorMessage, locale)) {
      $('.email-field').removeClass('valid');
      $('.email-field').addClass('error');
      if (this.state.errors.email!=emailInvalidErrorMessage[locale]) {
        this.setState({errors: {email: emailInvalidErrorMessage[locale]}})
      }
      return false;
    }

    if (this.state.errors.email!=null) {
      $('.email-field').removeClass('error');
      $('.email-field').addClass('valid');
      this.setState({errors: {email: null}})
    }

    return true;
  }

  clearForm = () => {
    this.setState({name: '', email: '', subject: '', message: '', files: [], attachments: [], liveValidation: false})
  }

  getAttributes = () => {
    const { locale } = this.props
    return {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
      attachments: this.state.attachments,
      user_agent: navigator.userAgent,
      timezone_offset: (new Date()).getTimezoneOffset(),
      locale: locale,
      url: document.location.href
    }
  }

  getMethodName = () => {
    return "createInquiry"
  }

  onSubmit = () => {
    if (this.validate()) {
      Meteor.call(this.getMethodName(), this.getAttributes(), (error, inquiryId) => {
        if (!error) {
          this.openThankYouDialog()
          this.clearForm()
        } else {
          alert("error")
        }
      });
    } else {
      this.setState({liveValidation: true})
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.liveValidation) {
      this.validate()
    }
  }

  openThankYouDialog = () => {
      this.setState({thankYouDialogOpened: true});
  };

  closeThankYouDialog = () => {
    this.setState({thankYouDialogOpened: false});
  };

  onDrop = (files) => {

    $('.dropzone').removeClass('reject');
    var uploader = new Slingshot.Upload("user-uploads");

    let errors = this.state.errors
    errors['files'] = []

    files.forEach((file) => {
      // Validate the file
      var error = uploader.validate(file)

      // The RejectClass for Dropzone should already take care of those errors
      if (error) {
        const {fileTypeError,locale} = this.props;
        if (translationExists(fileTypeError, locale)) {
          errors['files'].push(file.name+": "+fileTypeError[locale])

        } else {
          errors['files'].push(error.toString())
        }
        return
      }

      let filesState = this.state.files
      let index = filesState.length
      filesState.push({status: "Uploading "+file.name, uploading: true})
      this.setState({files: filesState})

      uploader.send(file, (error, downloadUrl) => {
        // Stop progress tracking on upload finish
        if (computation!=null) {
          computation.stop();
        }

        if (error) {
          filesState = this.state.files
          filesState[index] = {status: "Upload error: "+(uploader.xhr ? uploader.xhr.response : error.toString()), uploading: false}
          this.setState({files: filesState})
          console.log("Error:")
          console.log(error)
          console.log(uploader.xhr)
        } else {
          const path = downloadUrl.slice(Meteor.settings.public.cdn.length)
          filesState = this.state.files
          if (filesState.length>index) {
            filesState = filesState.slice(0, index).concat(filesState.slice(index+1, filesState.length))
          }
          this.setState({files: filesState})

          let attachments = this.state.attachments
          const remotePath = downloadUrl.replace(/^http(.*)amazonaws.com*/, "")
          attachments.push({filename: file.name, path: remotePath, size: file.size, type: file.type})
          this.setState({attachments})
        }
      });

      // Track upload progress
      let computation = Tracker.autorun(() => {
          if(!isNaN(uploader.progress())) {
            filesState = this.state.files
            filesState[index]['progress'] = (uploader.progress() * 100)
            this.setState({files: filesState})
          }
      });

    })

    // Set the errors if any
    if (errors['files'].length > 0) {
      this.setState({errors})
    }
  }

  onDropRejected = (files) => {
    $('.dropzone').addClass('reject');
  }
  onDragEnter = () => {
    $('.dropzone').removeClass('reject');
  }

  removeAttachment(event, index) {
    event.stopPropagation();

    this.state.attachments.splice(index,1)
    attachments = this.state.attachments
    this.setState({attachments})
  }

  renderForm() {
    const { nameLabel, emailLabel, subjectLabel, messageLabel, uploadButtonLabel, sendButtonLabel, thankYouTitle, thankYouMessage, thankYouOkButtonLabel, fileTypeError, locale } = this.props;

    const styles = {
      floatingLabelShrinkStyle: {
        transform: 'scale(0.65) translate3d(0px, -10px, 0px)'
      },
      errorStyle: {
        position: 'absolute',
        right: '40px',
        color: '#D9D9D9',
        top: '27px',
        color: '#FF7777',
      },
      progress: {
        width: "100%",
        marginLeft: "0",
        marginTop: "5px"
      },
      rejectStyle: {
        borderStyle: 'solid',
        borderColor: '#000',
      },
      activeStyle: {
        borderStyle: 'solid',
        borderColor: '#ff0',
      }
    }

    return (
      <div className='form'>
        {
          translationExists(nameLabel, locale)
          ?
            <div className='field'>
              <TextField
                id="name"
                className="input-field"
                floatingLabelText={nameLabel[locale]}
                floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                value={this.state.name}
                onChange={(event) => this.setState({name: event.target.value})}
              />
            </div>
          : null
        }
        {
          translationExists(emailLabel, locale)
          ?
            <div className='field email-field'>
              <TextField
                id="email"
                className="input-field"
                floatingLabelText={emailLabel[locale]}
                floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                errorStyle={styles.errorStyle}
                value={this.state.email}
                onChange={(event) => this.setState({email: event.target.value})}
                errorText={this.state.errors.email}
              />
              <ErrorIcon className='remove' />
              <CheckCircleIcon className='checked' />
            </div>
          : null
        }
        {
          translationExists(subjectLabel, locale)
          ?
            <div className='field'>
              <TextField
                id="subject"
                className="input-field"
                floatingLabelText={subjectLabel[locale]}
                floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                value={this.state.subject}
                onChange={(event) => this.setState({subject: event.target.value})}
              />
            </div>
          : null
        }
        {
          translationExists(messageLabel, locale)
          ?
            <div className='field'>
              <TextField
                id="message"
                className="textarea-field"
                floatingLabelText={messageLabel[locale]}
                floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                multiLine={true}
                rows={4}
                rowsMax={6}
                value={this.state.message}
                onChange={(event) => this.setState({message: event.target.value})}
              />
            </div>
          : null
        }

        {
          translationExists(uploadButtonLabel, locale)
          ? <Dropzone
              onDrop={this.onDrop}
              multiple={true}
              className="dropzone"
              ref="dropzone"
              accept="application/zip,
                      application/x-zip-compressed,
                      application/pdf, application/x-pdf, application/acrobat, text/pdf, text/x-pdf,
                      application/msword,
                      application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                      .pdf, .doc, .docx, .zip"
              onDropRejected={this.onDropRejected}
              onDragEnter={this.onDragEnter}
              rejectClassName='reject'>
              {
                (this.state.attachments.length > 0 || this.state.files.length > 0)
                ?
                null
                :
                <div className='text'>
                  {uploadButtonLabel[locale]}
                </div>
              }

              <ul className="attachments">
                {this.state.attachments.map((attachment, index) =>
                  <li key={"attachment_"+index}>
                    <DescriptionIcon className='file' />
                    <div className='inner'>
                      {attachment.filename}
                      <HighlightOffIcon style={{cursor: 'pointer'}} className='remove' onClick={(event) => { this.removeAttachment(event, index) }} />
                    </div>
                  </li>
                )}
              </ul>

              <ul className="uploading_files">
                {this.state.files.map((file, index) =>
                  <li key={"files_"+index}>
                    <DescriptionIcon className='file' />
                    <div className='inner'>
                      {file.status}<br/>
                      <LinearProgress mode="determinate" color={"#00D1C7"} value={file.progress} style={styles.progress}/>
                    </div>
                  </li>
                )}
              </ul>
              <div className="tips">*PDF, Doc, Docx, zip.</div>
              <div className="errors">
                {this.state.errors.files && this.state.errors.files.map((fileError, index) =>
                  <li key={"fileError_"+index}>{fileError}</li>
                )}

                {fileTypeError[locale]}
              </div>
            </Dropzone>
          : null
        }

        {
          translationExists(sendButtonLabel, locale)
          ?
            <div className="button_component">
              <FlatButton
                label={sendButtonLabel[locale]}
                className='primary_button btn-3d btn-3db'
                onTouchTap={this.onSubmit}
              />
            </div>
          : null
        }
      </div>
    )
  }

  renderThankYouDialog() {
    const { thankYouTitle, thankYouMessage, thankYouOkButtonLabel, locale } = this.props;

    const actions = [
      translationExists(thankYouOkButtonLabel, locale) && <FlatButton
        label={thankYouOkButtonLabel[locale]}
        primary={true}
        className='button'
        onTouchTap={this.closeThankYouDialog}
      />
    ];

    return (
      <div>
      {translationExists(thankYouTitle, locale) && translationExists(thankYouMessage, locale) && <Dialog
        actions={actions}
        modal={false}
        className={'thankyou_popup ' + locale}
        actionsContainerClassName='actions'
        bodyClassName='content_box'
        open={this.state.thankYouDialogOpened}
        onRequestClose={this.closeThankYouDialog}
      >
        <div className='title'>
          <h1><span>{nl2br(thankYouTitle[locale])}</span></h1>
        </div>
        {nl2br(thankYouMessage[locale])}
      </Dialog>}
      </div>
    )
  }

  render() {
    const { title, text, socialLinks, socialIcons, locale } = this.props;

    const form = this.renderForm()
    const thankYouDialog = this.renderThankYouDialog()

    return (
      <div className='contact_form_component container'>
        {thankYouDialog}
        <div className='info'>
          {
            translationExists(title, locale)
            ? <h1><span>{nl2br(title[locale])}</span></h1>
            : null
          }
          {
            translationExists(text, locale)
            ? <Linkify>
                <h4>
                  {nl2br(text[locale])}
                </h4>
              </Linkify>
            : null
          }
          <CenteredImageComponent links={socialLinks}
                                  images={socialIcons}
          />
        </div>
        {form}
      </div>
    );
  }

  preview() {
    const { title, text, nameLabel, emailLabel, subjectLabel, messageLabel, sendButtonLabel, locale } = this.props;

    let texts = [];

    translationExists(title, locale)
    ? texts.push("Title: "+title[locale].substring(0, 50))
    : null

    translationExists(text, locale)
    ? texts.push("Text: "+text[locale].substring(0, 50))
    : null

    translationExists(nameLabel, locale)
    ? texts.push("Name Label: "+nameLabel[locale].substring(0, 50))
    : null

    translationExists(emailLabel, locale)
    ? texts.push("Email Label: "+emailLabel[locale].substring(0, 50))
    : null

    translationExists(subjectLabel, locale)
    ? texts.push("Subject Label: "+subjectLabel[locale].substring(0, 50))
    : null

    translationExists(messageLabel, locale)
    ? texts.push("Message Label: "+messageLabel[locale].substring(0, 50))
    : null

    return (
      <div>{texts.join(", ")}</div>
    )
  }
};

ContactFormComponent.propTypes = {
  title: translatedStringProp,
  text: translatedStringProp,
  nameLabel: translatedStringProp,
  emailLabel: translatedStringProp,
  subjectLabel: translatedStringProp,
  messageLabel: translatedStringProp,
  sendButtonLabel: translatedStringProp,
  uploadButtonLabel: translatedStringProp,
  fileTypeError: translatedStringProp,
  emailMissingErrorMessage: translatedStringProp,
  emailInvalidErrorMessage: translatedStringProp,
  thankYouTitle: translatedStringProp,
  thankYouMessage: translatedStringProp,
  thankYouOkButtonLabel: translatedStringProp,
  socialIcons: arrayOfImagesProp,
  socialLinks: arrayOfStringsProp,
  locale: React.PropTypes.string.isRequired
}
