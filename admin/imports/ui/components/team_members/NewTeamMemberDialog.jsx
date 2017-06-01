import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import TeamMemberForm from './TeamMemberForm';

// Action
import { createTeamMember } from '../../../client/actions/team_members';

export default class NewTeamMemberDialog extends React.Component {
  submit = () => {
    const { dispatch } = this.props;
    dispatch(createTeamMember(this.formComponent.state));
  }

  render() {
    const { localizations } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/team_members"/>}
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
            title="Create a new team member"
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <TeamMemberForm
            localizations={localizations}
            ref={node => this.formComponent = node }
          />
        </Dialog>
      </div>
    );
  }
};
