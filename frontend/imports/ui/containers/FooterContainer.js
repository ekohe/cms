import { createContainer } from 'meteor/react-meteor-data';
import Footer from '../components/Footer'

import { MenuEntries, Localizations } from '../../../common/imports/collections';

export default FooterContainer = createContainer(() => {
  return {
    subscriptionReady: true,
    collection: MenuEntries.find({}, {sort: {position: 1}}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, Footer);
