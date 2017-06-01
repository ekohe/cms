import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Localizations } from '../../../../common/imports/collections';
import Offices from '../../../../common/imports/collections/offices';
import OfficesList from '../../components/offices/OfficesList';

const OfficesListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('offices');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    collection: Offices.find({}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, OfficesList);

export default connect()(OfficesListContainer);
