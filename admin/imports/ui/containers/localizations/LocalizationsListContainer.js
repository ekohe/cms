import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Localizations } from '../../../../common/imports/collections';
import LocalizationsList from '../../components/localizations/LocalizationsList';

const LocalizationsListContainer = createContainer(() => {
  const localizationsSubscription = Meteor.subscribe('localizations');
  return {
    localizationsSubscriptionReady: localizationsSubscription.ready(),
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, LocalizationsList);

export default connect()(LocalizationsListContainer);
