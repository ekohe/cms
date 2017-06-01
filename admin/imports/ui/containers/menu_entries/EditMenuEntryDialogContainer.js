import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditMenuEntryDialog from '../../components/menu_entries/EditMenuEntryDialog.jsx';
import { MenuEntries, Localizations } from '../../../../common/imports/collections';

const EditMenuEntryDialogContainer = createContainer(({id, sub_menu_entry_id}) => {
  const subscription = Meteor.subscribe('menu_entries');
  const localizations = Meteor.subscribe('localizations');

  let object = {}

  if (sub_menu_entry_id) {
    const menuEntry = MenuEntries.findOne({_id: id}) || {}
    if (menuEntry.children) {
      object = menuEntry.children.filter(entry => (entry._id == sub_menu_entry_id))[0]
    }
  } else {
    object = MenuEntries.findOne({_id: id}) || {}
  }

  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    object: object,
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || [],
    menu_entry_id: id,
    sub_menu_entry_id: sub_menu_entry_id
  };
}, EditMenuEntryDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.menu_entry_id,
    sub_menu_entry_id: ownProps.sub_menu_entry_id
  };
}

export default connect(mapStateToProps)(EditMenuEntryDialogContainer);
