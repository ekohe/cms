import { browserHistory } from 'react-router'

import displaySnackBarMessage from './snackbar'

export const createMenuEntry = attributes => {
  return dispatch => {
    Meteor.call('createMenuEntry', attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Menu entry created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/menu_entries');
  };
};

export const updateMenuEntry = (id, attributes) => {
  return dispatch => {
    Meteor.call('updateMenuEntry', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Menu entry updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/menu_entries');
  };
};

export const deleteMenuEntry = (id) => {
  return dispatch => {
    Meteor.call('deleteMenuEntry', id, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Menu entry deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};

export const createSubMenuEntry = (id, attributes) => {
  return dispatch => {
    Meteor.call('createSubMenuEntry', id, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Submenu entry created"));
      } else {
        console.log(error)
        dispatch(displaySnackBarMessage("An error occured! "+error.reason));
      }
    });

    // Back to the list
    browserHistory.push('/menu_entries/'+id+'/subentries');
  };
};

export const updateSubMenuEntry = (menuEntryId, subMenuEntryId, attributes) => {
  return dispatch => {
    Meteor.call('updateSubMenuEntry', menuEntryId, subMenuEntryId, attributes, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Submenu entry updated"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });

    // Back to the list
    browserHistory.push('/menu_entries/'+menuEntryId+'/subentries');
  };
};

export const deleteSubMenuEntry = (menuEntryId, subMenuEntryId) => {
  return dispatch => {
    Meteor.call('deleteSubMenuEntry', menuEntryId, subMenuEntryId, (error) => {
      if (!error) {
        dispatch(displaySnackBarMessage("Submenu entry deleted"));
      } else {
        dispatch(displaySnackBarMessage("An error occured!"));
      }
    });
  };
};
