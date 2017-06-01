import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import ProjectForm from './ProjectForm';

// Action
import { updateProject } from '../../../client/actions/projects';

export default class EditProjectDialog extends React.Component {
  state = {
    ready: this.props.subscriptionReady
  }

  submit = () => {
    const { dispatch } = this.props;
    dispatch(updateProject(this.props.object._id, this.formComponent.state));
  }

  render() {
    const { localizations, object } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/projects"/>}
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
          title="Edit project"
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
        >
        <ProjectForm
          {...object}
          localizations={localizations}
          ref={node => this.formComponent = node }
        />
      </Dialog>
    );
  }
};
