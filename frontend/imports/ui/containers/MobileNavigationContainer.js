import { createContainer } from 'meteor/react-meteor-data';
import MobileNavigation from '../components/MobileNavigation'

import { MenuEntries, Localizations } from '../../../common/imports/collections';

export default MobileNavigationContainer = createContainer(() => {
  Meteor.subscribe("menu_entries");
  return {
    subscriptionReady: true,
    collection: MenuEntries.find({}, {sort: {position: 1}}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, MobileNavigation);
