import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router';

import PageForm from './PageForm';

// Action
import { updatePage } from '../../../client/actions/pages';

export default class EditPageDialog extends React.Component {
  state = {
    ready: this.props.subscriptionReady
  }

  submit = () => {
    const { dispatch } = this.props;
    dispatch(updatePage(this.props.object._id, this.formComponent.state));
  }

  render() {
    const { localizations, object } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to="/pages"/>}
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
          title="Edit page"
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
        >
        <PageForm
          {...object}
          localizations={localizations}
          ref={node => this.formComponent = node }
        />
      </Dialog>
    );
  }
};
