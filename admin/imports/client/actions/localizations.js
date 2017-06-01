import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createLocalization = attributes => {
  return dispatch => {
    Meteor.call('createLocalization', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Localization created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/localizations');
  };
};

export const updateLocalization = (id, attributes) => {
  return dispatch => {
    Meteor.call('updateLocalization', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Localization updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/localizations');
  };
};

export const deleteLocalization = (id) => {
  return dispatch => {
    Meteor.call('deleteLocalization', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Localization deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
