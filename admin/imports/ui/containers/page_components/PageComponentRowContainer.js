import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import PageComponentRow from '../../components/page_components/PageComponentRow.jsx';

const PageComponentRowContainer = createContainer(({id}) => {
  return {
  };
}, PageComponentRow);

function mapStateToProps(state, ownProps) {
  return ownProps;
}

export default connect(mapStateToProps)(PageComponentRowContainer);
