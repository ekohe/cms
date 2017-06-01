import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { MenuEntries, Localizations } from '../../../../common/imports/collections';
import MenuEntriesList from '../../components/menu_entries/MenuEntriesList';

const MenuSubEntriesListContainer = createContainer(({id}) => {
  const subscription = Meteor.subscribe('menu_entries');
  const localizations = Meteor.subscribe('localizations');

  const menuEntry = MenuEntries.findOne({_id: id})

  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    collection: menuEntry ? (menuEntry.children.sort((a,b) => (a.position < b.position ? -1 : 1)) || []) : [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || [],
    menuEntry: menuEntry
  };
}, MenuEntriesList);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.id
  };
}


export default connect(mapStateToProps)(MenuSubEntriesListContainer);
