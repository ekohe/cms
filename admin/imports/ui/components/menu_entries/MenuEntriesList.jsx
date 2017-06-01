import React, { PropTypes } from 'react'

// UI components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import FlatButton from 'material-ui/FlatButton';

// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { Link } from 'react-router';

// Action
import { deleteMenuEntry, deleteSubMenuEntry } from '../../../client/actions/menu_entries';

class MenuEntriesList extends React.Component {

  deleteEntry(id) {
    const { dispatch, menuEntry } = this.props;

    if (menuEntry) {
      dispatch(deleteSubMenuEntry(menuEntry._id, id))
    } else {
      dispatch(deleteMenuEntry(id))
    }
  }

  render() {
    const { collection, localizations, subscriptionReady, menuEntry } = this.props;

    if (!subscriptionReady) {
      return (
        <LinearProgress/>
      )
    }

    return (
      <Table
        selectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          >
          <TableRow>
            <TableHeaderColumn>Position</TableHeaderColumn>
            {localizations.map(locale =>
              <TableHeaderColumn key={"header_"+locale._id}>{locale.name} name</TableHeaderColumn>
            )}
            <TableHeaderColumn>URL</TableHeaderColumn>
            {(menuEntry==null) && <TableHeaderColumn>Subentries</TableHeaderColumn>}
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          displayRowCheckbox={false}
          >
          {collection.map(row =>
            <TableRow key={row._id}>
              <TableRowColumn>{row.position}</TableRowColumn>
              {localizations.map(locale =>
                <TableRowColumn key={"name_"+locale._id}>{row.name[locale.locale]}</TableRowColumn>
              )}
              <TableRowColumn>{row.url}</TableRowColumn>

              {(menuEntry==null) && <TableRowColumn>
                <FlatButton label={row.children ? row.children.length : '0'} primary={true} containerElement={<Link to={"/menu_entries/"+row._id+"/subentries"}/>} />
              </TableRowColumn>}
              <TableRowColumn style={{"textAlign": "right"}}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  useLayerForClickAway={true}
                >
                  <MenuItem primaryText="Edit" leftIcon={<EditIcon />} containerElement={menuEntry ? <Link to={"/menu_entries/"+menuEntry._id+"/subentries/"+row._id+"/edit"}/> : <Link to={"/menu_entries/"+row._id+"/edit"}/>}/>
                  <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{this.deleteEntry(row._id)}}/>
                </IconMenu>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}

export default MenuEntriesList;
