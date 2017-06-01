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
import { deleteTeamMember } from '../../../client/actions/team_members';

export default class TeamMembersList extends React.Component {
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
            <TableHeaderColumn>Order</TableHeaderColumn>
            <TableHeaderColumn>Slug</TableHeaderColumn>
            <TableHeaderColumn>First name</TableHeaderColumn>
            <TableHeaderColumn>Last name</TableHeaderColumn>
            <TableHeaderColumn>Published</TableHeaderColumn>
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
                {row.rank}
              </TableRowColumn>
              <TableRowColumn>
                {row.slug}
              </TableRowColumn>
              <TableRowColumn>
                {row.first_name}
              </TableRowColumn>
              <TableRowColumn>
                {row.last_name}
              </TableRowColumn>
              <TableRowColumn>
                {row.published ? <Checkbox checked={true} disabled={true}/> : null}
              </TableRowColumn>
              <TableRowColumn style={{"textAlign": "right"}}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  useLayerForClickAway={true}
                >
                  <MenuItem primaryText="Edit" leftIcon={<EditIcon />} containerElement={<Link to={"/team_members/"+row._id+"/edit"}/>}/>
                  <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deleteTeamMember(row._id))}}/>
                </IconMenu>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
