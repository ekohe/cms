import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import humanizeString from '/common/imports/helpers/humanizeString'
import { Link } from 'react-router';

// Actions
import { deletePageComponent } from '../../../client/actions/page_components'

export default class EditPageComponentDialog extends React.Component {

  delete = () => {
    const { dispatch } = this.props;
    dispatch(deletePageComponent(this.props.pageId, this.props.component._id));
  }

  render() {
    const { component, localizations } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to={"/pages/"+this.props.pageId+"/design"}/>}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        containerElement={<a/>}
        onTouchTap={this.delete}
      />
    ];

    return (
      <Dialog
          title={"Are you sure to delete this "+humanizeString(component.type)+" ?"}
          actions={actions}
          open={true}
        >
      </Dialog>
    )
  }
}
