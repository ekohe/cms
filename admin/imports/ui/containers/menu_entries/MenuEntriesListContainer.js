import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { MenuEntries, Localizations } from '../../../../common/imports/collections';
import MenuEntriesList from '../../components/menu_entries/MenuEntriesList';

const MenuEntriesListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('menu_entries');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    collection: MenuEntries.find({}, {sort: {position: 1}}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, MenuEntriesList);

export default connect()(MenuEntriesListContainer);
