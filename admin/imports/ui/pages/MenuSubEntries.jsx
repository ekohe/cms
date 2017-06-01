import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import MenuSubEntriesListContainer from '../containers/menu_entries/MenuSubEntriesListContainer'
import NewMenuEntryDialogContainer from '../containers/menu_entries/NewMenuEntryDialogContainer'
import EditMenuEntryDialogContainer from '../containers/menu_entries/EditMenuEntryDialogContainer'

const styles = {
  createButtonStyle: {
    float: 'right',
    marginRight: 40,
    marginTop: 20,
  },
  backButtonStyle: {
    float: 'left',
    position: 'relative',
    top: '18px',
    marginLeft: '10px',
    marginRight: '5px'
  }
};

export default class MenuSubEntries extends React.Component {
  render() {
    // On /menu_entries/:id/subentries/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /menu_entries/:id/subentries/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':submenu_entry_id/edit' : false);

    const menuEntryId = this.props.params.id

    return (
    <div>
      <Link to={"/menu_entries/"+menuEntryId+"/subentries/new"}>
        <FloatingActionButton mini={true} style={styles.createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <IconButton style={styles.backButtonStyle} containerElement={<Link to={"/menu_entries"}/>}>
        <ArrowBack/>
      </IconButton>
      <h1>Submenu entries</h1>
      <MenuSubEntriesListContainer id={menuEntryId}/>
      {newDialogOpened && <NewMenuEntryDialogContainer id={menuEntryId}/>}
      {editDialogOpened && <EditMenuEntryDialogContainer menu_entry_id={menuEntryId} sub_menu_entry_id={this.props.params.submenu_entry_id}/>}
    </div>
    )
  };
}
