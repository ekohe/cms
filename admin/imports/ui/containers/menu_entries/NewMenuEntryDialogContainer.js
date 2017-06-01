import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Localizations } from '../../../../common/imports/collections';
import NewMenuEntryDialog from '../../components/menu_entries/NewMenuEntryDialog.jsx';

const NewMenuEntryDialogContainer = createContainer(({id}) => {
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: localizations.ready(),
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || [],
    id: id
  };
}, NewMenuEntryDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.id
  };
}

export default connect(mapStateToProps)(NewMenuEntryDialogContainer);
