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
import MessageIcon from 'material-ui/svg-icons/communication/message'

import { Link } from 'react-router';

// Collections
import { Localizations } from '/common/imports/collections';

// Action
import { markAsProcessedInquiry, deleteInquiry } from '../../../client/actions/inquiries';

const dateFormat = function(date) {
  var day = date.getDate()
  var monthIndex = date.getMonth()+1
  var year = date.getFullYear()
  return year+"-"+monthIndex+"-"+day
}

export default class InquiriesList extends React.Component {
  render() {
    const { dispatch, inquiries, localizations, subscriptionReady } = this.props;

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
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Language</TableHeaderColumn>
            <TableHeaderColumn>Subject</TableHeaderColumn>
            <TableHeaderColumn>Attachments</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Done</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          displayRowCheckbox={false}
          >
          {inquiries.map(inquiry =>
            <TableRow key={inquiry._id}>
              <TableRowColumn>{inquiry.email}</TableRowColumn>
              <TableRowColumn>{inquiry.name}</TableRowColumn>
              <TableRowColumn>{Localizations.find({locale: inquiry.locale}).fetch()[0] ? Localizations.find({locale: inquiry.locale}).fetch()[0].name : inquiry.locale}</TableRowColumn>
              <TableRowColumn>{inquiry.subject}</TableRowColumn>
              <TableRowColumn>{(inquiry.attachments!=null) ? inquiry.attachments.length : ''}</TableRowColumn>
              <TableRowColumn>{dateFormat(inquiry.createdAt)}</TableRowColumn>
              <TableRowColumn>
                <Checkbox checked={inquiry.processed} onCheck={(event,isInputChecked)=>{dispatch(markAsProcessedInquiry(inquiry._id, isInputChecked))}}/>
              </TableRowColumn>
              <TableRowColumn style={{"textAlign": "right"}}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  useLayerForClickAway={true}
                >
                  <MenuItem primaryText="Details" leftIcon={<MessageIcon />} containerElement={<Link to={"/inquiries/"+inquiry._id}/>}/>
                  <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deleteInquiry(inquiry._id))}}/>
                </IconMenu>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
