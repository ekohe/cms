import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createTeamMember = attributes => {
  return dispatch => {
    Meteor.call('createTeamMember', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Team Member created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/team_members');
  };
};

export const updateTeamMember = (id, attributes) => {
  return dispatch => {
    Meteor.call('updateTeamMember', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Team Member updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/team_members');
  };
};

export const deleteTeamMember = (id) => {
  return dispatch => {
    Meteor.call('deleteTeamMember', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Team Member deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
