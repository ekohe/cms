import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import LocalizationForm from './LocalizationForm';

// Action
import { createLocalization } from '../../../client/actions/localizations';

class NewLocalizationDialog extends React.Component {
  submit = () => {
    const { dispatch } = this.props;
    dispatch(createLocalization(this.formComponent.state));
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/localizations"/>}
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
            title="Create a new localization"
            actions={actions}
            open={true}
          >
          <LocalizationForm
            ref={node => this.formComponent = node }
          />
        </Dialog>
      </div>
    );
  }
};

export default NewLocalizationDialog;
