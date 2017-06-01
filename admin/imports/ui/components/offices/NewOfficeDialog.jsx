import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import OfficeForm from './OfficeForm';

// Action
import { createOffice } from '../../../client/actions/offices';

export default class NewOfficeDialog extends React.Component {
  submit = () => {
    const { dispatch } = this.props;
    dispatch(createOffice(this.formComponent.state));
  }

  render() {
    const { localizations } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/offices"/>}
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
            title="Create a new office"
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <OfficeForm
            localizations={localizations}
            ref={node => this.formComponent = node }
          />
        </Dialog>
      </div>
    );
  }
};
