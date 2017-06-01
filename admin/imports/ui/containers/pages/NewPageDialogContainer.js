import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Localizations } from '../../../../common/imports/collections';
import NewPageDialog from '../../components/pages/NewPageDialog.jsx';

const NewPageDialogContainer = createContainer(() => {
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: localizations.ready(),
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, NewPageDialog);

export default connect()(NewPageDialogContainer);
