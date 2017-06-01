import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createImage = attributes => {
  return dispatch => {
    Meteor.call('createImage', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Image created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/images');
  };
};


export const updateImage = (id, attributes) => {
  return dispatch => {
    Meteor.call('updateImage', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Image updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/images');
  };
};

export const deleteImage = (id) => {
  return dispatch => {
    Meteor.call('deleteImage', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Image deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
