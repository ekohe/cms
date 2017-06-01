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
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { Link } from 'react-router';

// Action
import { deleteUser, authorizeUser} from '../../../client/actions/users';

const dateFormat = function(date) {
  var day = date.getDate()
  var monthIndex = date.getMonth()+1
  var year = date.getFullYear()
  return year+"-"+monthIndex+"-"+day
}

export default class UsersList extends React.Component {
  render() {
    const { dispatch, users, localizations, subscriptionReady } = this.props;

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
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Connection date</TableHeaderColumn>
            <TableHeaderColumn>Authorized</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          displayRowCheckbox={false}
          >
          {users.map(user =>
            <TableRow key={user._id}>
              <TableRowColumn>
                {user.services.google.given_name}
                &nbsp;
                {user.services.google.family_name}
              </TableRowColumn>
              <TableRowColumn>
                {user.services.google.email}
              </TableRowColumn>
              <TableRowColumn>
                {dateFormat(user.createdAt)}
              </TableRowColumn>
              <TableRowColumn>
                <Checkbox checked={user.authorized} onCheck={(event,isInputChecked)=>{dispatch(authorizeUser(user._id, isInputChecked))}}/>
              </TableRowColumn>
              <TableRowColumn style={{"textAlign": "right"}}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  useLayerForClickAway={true}
                >
                  <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deleteUser(user._id))}}/>
                </IconMenu>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
