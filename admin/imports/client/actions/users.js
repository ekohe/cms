import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const deleteUser = (id) => {
  return dispatch => {
    Meteor.call('deleteUser', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("User deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};

export const authorizeUser = (id, authorized) => {
  return dispatch => {
    Meteor.call('authorizeUser', id, authorized, (error) => {
      if (!error) {
        if (authorized) {
          dispatch(displaySnackBarMessage("User is now authorized!"));
        } else {
          dispatch(displaySnackBarMessage("User is now deauthorized!"));          
        }
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
