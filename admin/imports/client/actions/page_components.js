import { browserHistory } from 'react-router'
import displaySnackBarMessage from './snackbar'

export const updatePageComponentProps = (id, componentId, componentAttributes) => {
  return dispatch => {
    Meteor.call('updatePageComponentProps', id, componentId, componentAttributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page component updated."));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the design page
    browserHistory.push('/pages/'+id+'/design');
  };
};

export const deletePageComponent = (id, componentId) => {
  return dispatch => {
    Meteor.call('deletePageComponent', id, componentId, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page component deleted."));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the design page
    browserHistory.push('/pages/'+id+'/design');
  };
};

export const addPageComponent = (id, type) => {
  return dispatch => {
    Meteor.call('addPageComponent', id, type, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page component added."));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the design page
    browserHistory.push('/pages/'+id+'/design');
  };
};

export const moveUpwardPageComponent = (id, component_id) => {
  return dispatch => {
    Meteor.call('moveUpwardPageComponent', id, component_id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page component moved up."));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });
  };
};

export const moveDownwardPageComponent = (id, component_id) => {
  return dispatch => {
    Meteor.call('moveDownwardPageComponent', id, component_id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page component moved down."));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });
  };
};
