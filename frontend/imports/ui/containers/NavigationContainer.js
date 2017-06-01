import { createContainer } from 'meteor/react-meteor-data';
import Navigation from '../components/Navigation'

import { MenuEntries, Localizations } from '../../../common/imports/collections';

export default NavigationContainer = createContainer(() => {
  Meteor.subscribe("menu_entries");
  return {
    subscriptionReady: true,
    collection: MenuEntries.find({}, {sort: {position: 1}}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, Navigation);
