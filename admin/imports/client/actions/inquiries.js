import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const deleteInquiry = (id) => {
  return dispatch => {
    Meteor.call('deleteInquiry', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Inquiry deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};

export const markAsProcessedInquiry = (id, completed) => {
  return dispatch => {
    Meteor.call('markInquiryAsProcessed', id, completed, (error) => {
      if (!error) {
        if (completed) {
          dispatch(displaySnackBarMessage("Inquiry is now marked as done!"));
        } else {
          dispatch(displaySnackBarMessage("Inquiry is now unmarked as done!"));
        }
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
