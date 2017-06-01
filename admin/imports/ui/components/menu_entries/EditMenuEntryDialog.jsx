import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import MenuEntryForm from './MenuEntryForm';

// Action
import { updateMenuEntry, updateSubMenuEntry } from '../../../client/actions/menu_entries';

export default class EditMenuEntryDialog extends React.Component {
  state = {
    ready: this.props.subscriptionReady
  }

  submit = () => {
    const { dispatch, menu_entry_id, sub_menu_entry_id } = this.props;

    if (sub_menu_entry_id) {
      dispatch(updateSubMenuEntry(menu_entry_id, this.props.object._id, this.formComponent.state));
    } else {
      dispatch(updateMenuEntry(this.props.object._id, this.formComponent.state));
    }
  }

  render() {
    const { localizations, object, menu_entry_id, sub_menu_entry_id } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={sub_menu_entry_id ? <Link to={"/menu_entries/"+menu_entry_id+"/subentries"}/> : <Link to="/menu_entries"/>}
      />,
      <FlatButton
        label="Update"
        primary={true}
        containerElement={<a/>}
        onTouchTap={this.submit}
      />,
    ];

    return (
      <Dialog
          title={sub_menu_entry_id ? "Edit submenu entry" : "Edit menu entry"}
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
        >
        <MenuEntryForm
          {...object}
          localizations={localizations}
          ref={node => this.formComponent = node }
        />
      </Dialog>
    );
  }
};
