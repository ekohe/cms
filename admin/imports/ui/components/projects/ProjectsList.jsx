import React, { PropTypes } from 'react'

// UI components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import Checkbox from 'material-ui/Checkbox';

// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { Link } from 'react-router';

// Action
import { deleteProject } from '../../../client/actions/projects';

export default class ProjectsList extends React.Component {
  render() {
    const { dispatch, collection, localizations, subscriptionReady } = this.props;

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
            <TableHeaderColumn>Slug</TableHeaderColumn>
            <TableHeaderColumn>Featured</TableHeaderColumn>
            {localizations.map(locale =>
              <TableHeaderColumn key={"header_"+locale._id}>{locale.name} name</TableHeaderColumn>
            )}
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          displayRowCheckbox={false}
          >
          {collection.map(row =>
            <TableRow key={row._id}>
              <TableRowColumn>
                {row.slug}
              </TableRowColumn>
              <TableRowColumn>
                {row.featured_on_homepage ? <Checkbox checked={true} disabled={true}/> : null}
              </TableRowColumn>
              {localizations.map(locale =>
                <TableRowColumn key={"name_"+locale._id}>{row.name ? row.name[locale.locale] : null}</TableRowColumn>
              )}
              <TableRowColumn style={{"textAlign": "right"}}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  useLayerForClickAway={true}
                >
                  <MenuItem primaryText="Edit" leftIcon={<EditIcon />} containerElement={<Link to={"/projects/"+row._id+"/edit"}/>}/>
                  <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deleteProject(row._id))}}/>
                </IconMenu>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
