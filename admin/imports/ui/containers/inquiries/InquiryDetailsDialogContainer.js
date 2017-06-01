import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import InquiryDetailsDialog from '../../components/inquiries/InquiryDetailsDialog.jsx';
import { Inquiries } from '../../../../common/imports/collections';

const InquiryDetailsDialogContainer = createContainer(({id}) => {
  const inquiriesSub = Meteor.subscribe('inquiries');
  return {
    inquiriesSubReady: inquiriesSub.ready(),
    inquiry: Inquiries.findOne({_id: id}) || {}
  };
}, InquiryDetailsDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.inquiryId
  };
}

export default connect(mapStateToProps)(InquiryDetailsDialogContainer);
