import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createPage = attributes => {
  return dispatch => {
    Meteor.call('createPage', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/pages');
  };
};

export const updatePage = (id, attributes) => {
  return dispatch => {
    Meteor.call('updatePage', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/pages');
  };
};

export const deletePage = (id) => {
  return dispatch => {
    Meteor.call('deletePage', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Page deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
