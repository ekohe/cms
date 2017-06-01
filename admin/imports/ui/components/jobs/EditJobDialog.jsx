import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import JobForm from './JobForm';

// Action
import { updateJob } from '../../../client/actions/jobs';

export default class EditJobDialog extends React.Component {
  state = {
    ready: this.props.subscriptionReady
  }

  submit = () => {
    const { dispatch } = this.props;
    dispatch(updateJob(this.props.object._id, this.formComponent.state));
  }

  render() {
    const { localizations, object } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/jobs"/>}
      />,
      <FlatButton
        label="Update"
        primary={true}
        containerElement={<a/>}
        onTouchTap={this.submit}
      />,
    ];

    return (
      <Dialog
          title="Edit job"
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
        >
        <JobForm
          {...object}
          localizations={localizations}
          ref={node => this.formComponent = node }
        />
      </Dialog>
    );
  }
};
