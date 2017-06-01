import React, { PropTypes } from 'react'

// UI components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { Link } from 'react-router';

// Action
import { deleteJob } from '../../../client/actions/jobs';

export default class JobsList extends React.Component {
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
            {localizations.map(locale =>
              <TableHeaderColumn key={"header_"+locale._id}>Position in {locale.name}</TableHeaderColumn>
            )}
            <TableHeaderColumn>Published</TableHeaderColumn>
            <TableHeaderColumn>Applications</TableHeaderColumn>
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
              {localizations.map(locale =>
                <TableRowColumn key={"position_"+locale._id}>{row.position ? row.position[locale.locale] : null}</TableRowColumn>
              )}
              <TableRowColumn>
                {row.published ? <Checkbox checked={true} disabled={true}/> : null}
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton label={row.job_applications ? row.job_applications.length : '0'} primary={true} containerElement={<Link to={"/jobs/"+row._id+"/applications"}/>} />
              </TableRowColumn>
              <TableRowColumn style={{"textAlign": "right"}}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  useLayerForClickAway={true}
                >
                  <MenuItem primaryText="Edit" leftIcon={<EditIcon />} containerElement={<Link to={"/jobs/"+row._id+"/edit"}/>}/>
                  <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deleteJob(row._id))}}/>
                </IconMenu>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
