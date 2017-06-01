import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import Navigation from '../components/Navigation'

function mapStateToProps(state) {
  return {visible: state.navigationVisibility.visible}
}

export default connect(mapStateToProps)(Navigation);
