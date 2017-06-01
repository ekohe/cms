import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import EditLocalizationDialog from '../../components/localizations/EditLocalizationDialog.jsx';
import { Localizations } from '../../../../common/imports/collections';

const EditLocalizationDialogContainer = createContainer(({id}) => {
  const localizationsSub = Meteor.subscribe('localizations');
  return {
    localizationsSubReady: localizationsSub.ready(),
    localization: Localizations.findOne({_id: id}) || {name: '', locale: ''}
  };
}, EditLocalizationDialog);

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.localizationId
  };
}

export default connect(mapStateToProps)(EditLocalizationDialogContainer);
