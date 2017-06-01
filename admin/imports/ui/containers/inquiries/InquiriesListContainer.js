import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import InquiriesList from '../../components/inquiries/InquiriesList';
import { Inquiries, Localizations } from '/common/imports/collections';

const InquiriesListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('inquiries');
  const localizationsSubscription = Meteor.subscribe('localizations');
  return {
    subscriptionReady: (subscription.ready() && localizationsSubscription.ready()),
    inquiries: Inquiries.find({}, {sort: {createdAt: -1}}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, InquiriesList);

export default connect()(InquiriesListContainer);
