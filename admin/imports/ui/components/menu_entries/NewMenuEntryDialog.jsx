import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import MenuEntryForm from './MenuEntryForm';

// Action
import { createMenuEntry, createSubMenuEntry } from '../../../client/actions/menu_entries';

export default class NewMenuEntryDialog extends React.Component {
  submit = () => {
    const { dispatch, id } = this.props;
    if (id) {
      dispatch(createSubMenuEntry(id, this.formComponent.state));
    } else {
      dispatch(createMenuEntry(this.formComponent.state));
    }
  }

  render() {
    const { localizations, id } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={id ? <Link to={"/menu_entries/"+id+"/subentries"}/> : <Link to="/menu_entries"/>}
      />,
      <FlatButton
        label="Create"
        primary={true}
        containerElement={<a/>}
        onTouchTap={this.submit}
      />,
    ];

    return (
      <div>
        <Dialog
            title={id ? "Create a new submenu entry" : "Create a new menu entry"}
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <MenuEntryForm
            localizations={localizations}
            ref={node => this.formComponent = node }
          />
        </Dialog>
      </div>
    );
  }
};
