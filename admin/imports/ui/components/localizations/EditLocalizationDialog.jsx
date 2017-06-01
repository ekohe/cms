import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import LocalizationForm from './LocalizationForm';

// Action
import { updateLocalization } from '../../../client/actions/localizations';

export default class EditLocalizationDialog extends React.Component {
  state = {
    ready: this.props.localizationsSubReady
  }

  submit = () => {
    const { dispatch } = this.props;
    dispatch(updateLocalization(this.props.localization._id, this.formComponent.state));
  }

  render() {
    const {localization} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/localizations"/>}
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
          title="Edit localization"
          actions={actions}
          open={true}
        >
        <LocalizationForm
          {...localization}
          ref={node => this.formComponent = node }
        />
      </Dialog>
    );
  }
};
