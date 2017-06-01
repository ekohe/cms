import React from 'react';

// UI components
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import PageForm from './PageForm';

// Action
import { createPage } from '../../../client/actions/pages';

export default class NewPageDialog extends React.Component {
  submit = () => {
    const { dispatch } = this.props;
    dispatch(createPage(this.formComponent.state));
  }

  render() {
    const { localizations } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/pages"/>}
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
            title="Create a new page"
            actions={actions}
            open={true}
            autoScrollBodyContent={true}
          >
          <PageForm
            localizations={localizations}
            ref={node => this.formComponent = node }
          />
        </Dialog>
      </div>
    );
  }
};
