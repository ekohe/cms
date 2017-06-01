import React from 'react';

// Properties
import translatedStringProp from '/common/imports/properties/translatedStringProp'
import stringProp from '/common/imports/properties/stringProp';

// Helpers
import translationExists from '/common/imports/helpers/translationExists'

// Components
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import ErrorIcon from 'material-ui/svg-icons/alert/error-outline';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import LinearProgress from 'material-ui/LinearProgress';

import ContactFormComponent from './ContactFormComponent'

export default class JobApplicationComponent extends ContactFormComponent {
  getAttributes = () => {
    const { jobId, locale } = this.props
    return {
      jobId: jobId,
      status: 'new',
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
    return "createJobApplication"
  }

  render() {
    const form = this.renderForm()
    const thankYouDialog = this.renderThankYouDialog()

    return (
      <div className='job_application_component container'>
        {thankYouDialog}
        {form}
      </div>
    );
  }
}

JobApplicationComponent.propTypes = {
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
  jobId: stringProp,
  locale: React.PropTypes.string.isRequired
}
