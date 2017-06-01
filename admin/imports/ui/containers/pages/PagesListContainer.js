import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Pages, Localizations } from '/common/imports/collections';
import PagesList from '../../components/pages/PagesList';

const PagesListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('pages');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    collection: Pages.find({}, {sort: {position: 1}}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, PagesList);

export default connect()(PagesListContainer);
