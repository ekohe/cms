import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import TeamMembersListContainer from '../containers/team_members/TeamMembersListContainer.js'
import NewTeamMemberDialogContainer from '../containers/team_members/NewTeamMemberDialogContainer.js'
import EditTeamMemberDialogContainer from '../containers/team_members/EditTeamMemberDialogContainer.js'
import { connect }  from 'react-redux';

const createButtonStyle = {
  float: 'right',
  marginRight: 40,
  marginTop: 20,
};

class TeamMembers extends React.Component {
  render() {
    // On /team_members/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /team_members/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);

    return (
    <div>
      <Link to="/team_members/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Team members</h1>
      <TeamMembersListContainer/>
      {newDialogOpened && <NewTeamMemberDialogContainer/>}
      {editDialogOpened && <EditTeamMemberDialogContainer officeId={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(TeamMembers)
