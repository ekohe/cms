import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import LocalizationsListContainer from '../containers/localizations/LocalizationsListContainer.js'
import NewLocalizationDialogContainer from '../containers/localizations/NewLocalizationDialogContainer.js'
import EditLocalizationDialogContainer from '../containers/localizations/EditLocalizationDialogContainer.js'
import { connect }  from 'react-redux';

const createButtonStyle = {
  float: 'right',
  marginRight: 40,
  marginTop: 20,
};

class Localizations extends React.Component {
  render() {
    // On /localizations/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /localizations/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);

    return (
    <div>
      <Link to="/localizations/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Localizations</h1>
      <LocalizationsListContainer/>
      {newDialogOpened && <NewLocalizationDialogContainer/>}
      {editDialogOpened && <EditLocalizationDialogContainer localizationId={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(Localizations)
