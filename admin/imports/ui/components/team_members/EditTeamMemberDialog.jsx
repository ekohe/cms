import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import TeamMemberForm from './TeamMemberForm';

// Action
import { updateTeamMember } from '../../../client/actions/team_members';

export default class EditTeamMemberDialog extends React.Component {
  state = {
    ready: this.props.subscriptionReady
  }

  submit = () => {
    const { dispatch } = this.props;
    dispatch(updateTeamMember(this.props.object._id, this.formComponent.state));
  }

  render() {
    const { localizations, object } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/team_members"/>}
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
          title="Edit team member"
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
        >
        <TeamMemberForm
          {...object}
          localizations={localizations}
          ref={node => this.formComponent = node }
        />
      </Dialog>
    );
  }
};
