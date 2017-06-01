import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import OfficesListContainer from '../containers/offices/OfficesListContainer.js'
import NewOfficeDialogContainer from '../containers/offices/NewOfficeDialogContainer.js'
import EditOfficeDialogContainer from '../containers/offices/EditOfficeDialogContainer.js'
import { connect }  from 'react-redux';

const createButtonStyle = {
  float: 'right',
  marginRight: 40,
  marginTop: 20,
};

class Offices extends React.Component {
  render() {
    // On /offices/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /offices/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);

    return (
    <div>
      <Link to="/offices/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Offices</h1>
      <OfficesListContainer/>
      {newDialogOpened && <NewOfficeDialogContainer/>}
      {editDialogOpened && <EditOfficeDialogContainer officeId={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(Offices)
