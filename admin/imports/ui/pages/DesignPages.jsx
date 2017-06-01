import React from 'react';

import { Localizations } from '/common/imports/collections';

// UI Components
import LinearProgress from 'material-ui/LinearProgress';
import PageComponentRowContainer from '../containers/page_components/PageComponentRowContainer';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import { Link } from 'react-router';
import { connect }  from 'react-redux';
import { updatePageComponents } from '../../client/actions/page_components'

import AddPageComponentDialogContainer from '../containers/page_components/AddPageComponentDialogContainer'
import EditPageComponentDialogContainer from '../containers/page_components/EditPageComponentDialogContainer'
import ConfirmPageComponentDeletionDialogContainer from '../containers/page_components/ConfirmPageComponentDeletionDialogContainer'

import { browserHistory } from 'react-router'

export default class DesignPages extends React.Component {
  // Open add dialog
  add = () => {
    const { id } = this.props;
    browserHistory.push("/pages/"+id+"/design/add");
  }

  render() {
    const { page, params, localizations, subscriptionReady } = this.props;

    if (!subscriptionReady) {
      return (
        <LinearProgress/>
      )
    }

    const styles = {
      centeredAddButton: {
        textAlign: 'center'
      },
      backButtonStyle: {
        float: 'left',
        position: 'relative',
        top: '18px',
        marginLeft: '10px',
        marginRight: '5px'
      },
      addButtonStyle: {
        marginBottom: '30px'
      }
    }

    let pageComponentRows = []
    const components = (page.components || []).sort((a, b) => a.position - b.position);

    let componentIndex = 0
    components.map(component => {
      pageComponentRows.push(
        <PageComponentRowContainer
          key={"component_"+(component._id)}
          component={component}
          pageId={page._id}
          index={componentIndex++}
          count={components.length}
          localizations={localizations}
          />)
    });

    // On /pages/:id/design/add, the add modal dialog must be opened
    const addDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='add' : false);
    const editPageComponentDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':page_component_id/edit' : false);
    const confirmPageComponentDeletionDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':page_component_id/confirm_deletion' : false);

    let componentToEditOrDelete = null
    if (params.page_component_id!=null) {
      componentToEditOrDelete = page.components.find(component => (component._id == params.page_component_id))
    }

    return (
    <div>
      <div>
        <IconButton style={styles.backButtonStyle} containerElement={<Link to={"/pages"}/>}>
          <ArrowBack/>
        </IconButton>
        <h1>Design page {"'"+page.title[Localizations.default() ? Localizations.default().locale : '']+"'"}</h1>
      </div>

      {pageComponentRows}

      <div style={styles.centeredAddButton}>
        <RaisedButton label="Add" secondary={true} onTouchTap={this.add} style={styles.addButtonStyle} />
      </div>

      {addDialogOpened && <AddPageComponentDialogContainer pageId={page._id}/>}
      {editPageComponentDialogOpened && <EditPageComponentDialogContainer pageId={page._id} pageType={page.type} component={componentToEditOrDelete} localizations={localizations}/>}
      {confirmPageComponentDeletionDialogOpened && <ConfirmPageComponentDeletionDialogContainer pageId={page._id} component={componentToEditOrDelete} localizations={localizations}/>}
    </div>
    )
  };
}
