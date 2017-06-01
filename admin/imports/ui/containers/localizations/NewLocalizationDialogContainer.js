import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import NewLocalizationDialog from '../../components/localizations/NewLocalizationDialog.jsx';

const NewLocalizationDialogContainer = createContainer(() => {
  return {};
}, NewLocalizationDialog);

export default connect()(NewLocalizationDialogContainer);
