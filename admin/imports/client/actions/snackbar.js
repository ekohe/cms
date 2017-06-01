export default displaySnackBarMessage = (message) => {
  return dispatch => {
      dispatch({
        type: 'DISPLAY_SNACKBAR_MESSAGE',
        message
      });

      setTimeout(() => {
        dispatch({type: 'HIDE_SNACKBAR_MESSAGE'});
      }, 4000);
  }
};
