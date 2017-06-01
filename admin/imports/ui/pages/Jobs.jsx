import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import JobsListContainer from '../containers/jobs/JobsListContainer.js'
import NewJobDialogContainer from '../containers/jobs/NewJobDialogContainer.js'
import EditJobDialogContainer from '../containers/jobs/EditJobDialogContainer.js'
import { connect }  from 'react-redux';

class Jobs extends React.Component {
  render() {
    // On /jobs/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /jobs/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);

    const createButtonStyle = {
      float: 'right',
      marginRight: 40,
      marginTop: 20,
    };

    return (
    <div>
      <Link to="/jobs/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Jobs</h1>
      <JobsListContainer/>
      {newDialogOpened && <NewJobDialogContainer/>}
      {editDialogOpened && <EditJobDialogContainer jobId={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(Jobs)
