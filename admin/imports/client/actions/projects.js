import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createProject = attributes => {
  return dispatch => {
    Meteor.call('createProject', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Project created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/projects');
  };
};

export const updateProject = (id, attributes) => {
  return dispatch => {
    Meteor.call('updateProject', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Project updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/projects');
  };
};

export const deleteProject = (id) => {
  return dispatch => {
    Meteor.call('deleteProject', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Project deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
