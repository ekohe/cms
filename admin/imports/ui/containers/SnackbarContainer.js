import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import Snackbar from 'material-ui/Snackbar'

const SnackbarContainer = createContainer(() => {
  return {};
}, Snackbar);

function mapStateToProps(state) {
  if (state.snackMessages.visible) {
    return {open: state.snackMessages.visible, message: state.snackMessages.currentMessage, autoHideDuration: 999999, action: null, onRequestClose: function() {}}
  } else {
    return {open: state.snackMessages.visible, message: '', autoHideDuration: 999999, action: null, onRequestClose: function() {}}
  }
}

export default connect(mapStateToProps)(Snackbar);
