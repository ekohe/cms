import React, { PropTypes } from 'react'

// UI components
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';

// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import BuildIcon from 'material-ui/svg-icons/action/build';

import { Link } from 'react-router';

// Action
import { deletePage } from '../../../client/actions/pages';

// Helpers
import humanizeString from '/common/imports/helpers/humanizeString';
import singularizeString from '/common/imports/helpers/singularizeString';

export default class PagesList extends React.Component {
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
            {localizations.map(locale =>
              <TableHeaderColumn key={"header_"+locale._id}>{locale.name} title</TableHeaderColumn>
            )}
            <TableHeaderColumn>Slug</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          displayRowCheckbox={false}
          >
          {collection.map(row =>
            <TableRow key={row._id}>
              {localizations.map(locale =>
                <TableRowColumn key={"title_"+locale._id}>{row.title[locale.locale]}</TableRowColumn>
              )}
              <TableRowColumn>{row.slug}</TableRowColumn>
              <TableRowColumn>
                {humanizeString(row.type)}
                {(row.type != 'static' && row.collection != null) ? <span> of {row.type=='element' ? singularizeString(humanizeString(row.collection)) : humanizeString(row.collection)}</span> : null}
              </TableRowColumn>
              <TableRowColumn>{row.status}</TableRowColumn>
              <TableRowColumn style={{"textAlign": "right"}}>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  useLayerForClickAway={true}
                >
                  <MenuItem primaryText="Edit" leftIcon={<EditIcon />} containerElement={<Link to={"/pages/"+row._id+"/edit"}/>}/>
                  <MenuItem primaryText="Design" leftIcon={<BuildIcon />} containerElement={<Link to={"/pages/"+row._id+"/design"}/>}/>
                  <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deletePage(row._id))}}/>
                </IconMenu>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
