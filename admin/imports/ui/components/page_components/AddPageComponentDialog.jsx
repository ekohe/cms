import React from 'react';

// UI Component
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ExtensionIcon from 'material-ui/svg-icons/action/extension'

// Custom components
import * as components from '/common/imports/ui/editable_components'
import humanizeString from '/common/imports/helpers/humanizeString'

import { Link } from 'react-router';
import { browserHistory } from 'react-router'

// Actions
import { addPageComponent } from '../../../client/actions/page_components'

export default class AddPageComponentDialog extends React.Component {
  add = (type) => {
    const { dispatch, pageId } = this.props;
    dispatch(addPageComponent(this.props.pageId, type));
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        containerElement={<Link to={"/pages/"+this.props.pageId+"/design"}/>}
      />
    ];

    const componentsList = []

    return (
      <Dialog
          title="Select a component to add"
          actions={actions}
          open={true}
          autoScrollBodyContent={true}
        >
        <List>
          {Object.keys(components).map(component =>
            <ListItem key={component} leftIcon={<ExtensionIcon />} primaryText={humanizeString(component)} onTouchTap={() => this.add(component)}/>
          )}
        </List>
      </Dialog>
    )
  }
}
