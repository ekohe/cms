import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import OfficeForm from './OfficeForm';

// Action
import { updateOffice } from '../../../client/actions/offices';

export default class EditOfficeDialog extends React.Component {
  state = {
    ready: this.props.subscriptionReady
  }

  submit = () => {
    const { dispatch } = this.props;
    dispatch(updateOffice(this.props.object._id, this.formComponent.state));
  }

  render() {
    const { localizations, object } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/offices"/>}
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
          title="Edit office"
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
        >
        <OfficeForm
          {...object}
          localizations={localizations}
          ref={node => this.formComponent = node }
        />
      </Dialog>
    );
  }
};
