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
import { deleteLocalization } from '../../../client/actions/localizations';

// Collections
import { Localizations } from '/common/imports/collections';

class LocalizationsList extends React.Component {
  render() {
    const { dispatch, localizations, localizationsSubscriptionReady } = this.props;

    if (!localizationsSubscriptionReady) {
      return (
        <LinearProgress/>
      )
    }

    return (
      <div>
        {Localizations.default()==null ? <div>Please configure a default localization.</div> : null}
        <Table
          selectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            >
            <TableRow>
              <TableHeaderColumn>Position</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Native name</TableHeaderColumn>
              <TableHeaderColumn>Locale Code</TableHeaderColumn>
              <TableHeaderColumn>{"ISO 639-1 Code"}</TableHeaderColumn>
              <TableHeaderColumn>Default</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            displayRowCheckbox={false}
            >
            {localizations.map(localization =>
              <TableRow key={localization._id}>
                <TableRowColumn>{localization.position}</TableRowColumn>
                <TableRowColumn>{localization.name}</TableRowColumn>
                <TableRowColumn>{localization.native_name}</TableRowColumn>
                <TableRowColumn>{localization.locale}</TableRowColumn>
                <TableRowColumn>{localization.iso6391_code}</TableRowColumn>
                <TableRowColumn>{localization.default ? <Checkbox checked={true} disabled={true}/> : null}</TableRowColumn>
                <TableRowColumn style={{"textAlign": "right"}}>
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    useLayerForClickAway={true}
                  >
                    <MenuItem primaryText="Edit" leftIcon={<EditIcon />} containerElement={<Link to={"/localizations/"+localization._id+"/edit"}/>}/>
                    <MenuItem primaryText="Delete" leftIcon={<DeleteIcon />} onTouchTap={()=>{dispatch(deleteLocalization(localization._id))}}/>
                  </IconMenu>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

LocalizationsList.propTypes = {
  localizations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default LocalizationsList;
