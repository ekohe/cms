import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Images, Localizations } from '../../../../common/imports/collections';
import NewOfficeDialog from '../../components/offices/NewOfficeDialog.jsx';

const NewOfficeDialogContainer = createContainer(() => {
  const images = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: images.ready() && localizations.ready(),
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, NewOfficeDialog);

export default connect()(NewOfficeDialogContainer);
