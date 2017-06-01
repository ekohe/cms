import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import JobForm from './JobForm';

// Action
import { createJob } from '../../../client/actions/jobs';

export default class NewJobDialog extends React.Component {
  submit = () => {
    const { dispatch } = this.props;
    dispatch(createJob(this.formComponent.state));
  }

  render() {
    const { localizations } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/jobs"/>}
      />,
      <FlatButton
        label="Create"
        primary={true}
        containerElement={<a/>}
        onTouchTap={this.submit}
      />,
    ];

    return (
      <div>
        <Dialog
            title="Create a new job"
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <JobForm
            localizations={localizations}
            ref={node => this.formComponent = node }
          />
        </Dialog>
      </div>
    );
  }
};
