import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import ProjectsListContainer from '../containers/projects/ProjectsListContainer.js'
import NewProjectDialogContainer from '../containers/projects/NewProjectDialogContainer.js'
import EditProjectDialogContainer from '../containers/projects/EditProjectDialogContainer.js'
import { connect }  from 'react-redux';

const createButtonStyle = {
  float: 'right',
  marginRight: 40,
  marginTop: 20,
};

class Projects extends React.Component {
  render() {
    // On /projects/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /projects/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);

    return (
    <div>
      <Link to="/projects/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Projects</h1>
      <ProjectsListContainer/>
      {newDialogOpened && <NewProjectDialogContainer/>}
      {editDialogOpened && <EditProjectDialogContainer officeId={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(Projects)
