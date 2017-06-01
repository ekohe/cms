import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createOffice = attributes => {
  return dispatch => {
    Meteor.call('createOffice', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Office created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/offices');
  };
};

export const updateOffice = (id, attributes) => {
  return dispatch => {
    Meteor.call('updateOffice', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Office updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/offices');
  };
};

export const deleteOffice = (id) => {
  return dispatch => {
    Meteor.call('deleteOffice', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Office deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
