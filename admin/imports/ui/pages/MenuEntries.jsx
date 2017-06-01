import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import MenuEntriesListContainer from '../containers/menu_entries/MenuEntriesListContainer'
import NewMenuEntryDialogContainer from '../containers/menu_entries/NewMenuEntryDialogContainer'
import EditMenuEntryDialogContainer from '../containers/menu_entries/EditMenuEntryDialogContainer'
import { connect }  from 'react-redux';

const createButtonStyle = {
  float: 'right',
  marginRight: 40,
  marginTop: 20,
};

class MenuEntries extends React.Component {
  render() {
    // On /menu_entries/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /menu_entries/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);

    return (
    <div>
      <Link to="/menu_entries/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Menu</h1>
      <MenuEntriesListContainer/>
      {newDialogOpened && <NewMenuEntryDialogContainer/>}
      {editDialogOpened && <EditMenuEntryDialogContainer menu_entry_id={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(MenuEntries)
