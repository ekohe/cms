import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import PagesListContainer from '../containers/pages/PagesListContainer'
import NewPageDialogContainer from '../containers/pages/NewPageDialogContainer'
import EditPageDialogContainer from '../containers/pages/EditPageDialogContainer'
import { connect }  from 'react-redux';

const createButtonStyle = {
  float: 'right',
  marginRight: 40,
  marginTop: 20,
};

class Pages extends React.Component {
  render() {
    // On /pages/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /pages/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);

    return (
    <div>
      <Link to="/pages/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Pages</h1>
      <PagesListContainer/>
      {newDialogOpened && <NewPageDialogContainer/>}
      {editDialogOpened && <EditPageDialogContainer page_id={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(Pages)
