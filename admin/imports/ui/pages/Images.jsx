import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';

import ImagesListContainer from '../containers/images/ImagesListContainer.js'
import NewImageDialogContainer from '../containers/images/NewImageDialogContainer.js'
import EditImageDialogContainer from '../containers/images/EditImageDialogContainer.js'
import ImageDetailsDialogContainer from '../containers/images/ImageDetailsDialogContainer.js'
import { connect }  from 'react-redux';

const createButtonStyle = {
  float: 'right',
  marginRight: 40,
  marginTop: 20,
};

class Images extends React.Component {
  render() {
    // On /images/new, the new modal dialog must be opened
    const newDialogOpened = (this.props.routes[2] ? this.props.routes[2].path=='new' : false);
    // On /images/:id/edit, the edit modal dialog must be opened
    const editDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/edit' : false);
    // On /images/:id/details, the details modal dialog must be opened
    const detailsDialogOpened = (this.props.routes[2] ? this.props.routes[2].path==':id/details' : false);


    return (
    <div>
      <Link to="/images/new">
        <FloatingActionButton mini={true} style={createButtonStyle}>
            <ContentAdd/>
        </FloatingActionButton>
      </Link>
      <h1>Images</h1>
      <ImagesListContainer/>
      {newDialogOpened && <NewImageDialogContainer/>}
      {editDialogOpened && <EditImageDialogContainer imageId={this.props.params.id}/>}
      {detailsDialogOpened && <ImageDetailsDialogContainer imageId={this.props.params.id}/>}
    </div>
    )
  };
}

export default connect()(Images)
