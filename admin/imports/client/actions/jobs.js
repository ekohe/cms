import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createJob = attributes => {
  return dispatch => {
    Meteor.call('createJob', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Job created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/jobs');
  };
};

export const updateJob = (id, attributes) => {
  return dispatch => {
    Meteor.call('updateJob', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Job updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/jobs');
  };
};

export const updateJobApplicationStatus = (id, application_id, application_created_at, status) => {
  return dispatch => {
    Meteor.call('updateJobApplicationStatus', id, application_id, application_created_at, status, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Job application updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
export const deleteJobApplication = (id, application_id, application_created_at) => {
  return dispatch => {
    Meteor.call('deleteJobApplication', id, application_id, application_created_at, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Job Application deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};

export const deleteJob = (id) => {
  return dispatch => {
    Meteor.call('deleteJob', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Job deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};


