import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import ProjectForm from './ProjectForm';

// Action
import { createProject } from '../../../client/actions/projects';

export default class NewProjectDialog extends React.Component {
  submit = () => {
    const { dispatch } = this.props;
    dispatch(createProject(this.formComponent.state));
  }

  render() {
    const { localizations } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/projects"/>}
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
            title="Create a new project"
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <ProjectForm
            localizations={localizations}
            ref={node => this.formComponent = node }
          />
        </Dialog>
      </div>
    );
  }
};
