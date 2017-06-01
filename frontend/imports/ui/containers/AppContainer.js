import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App'
import { Images, Pages, Localizations } from '../../../common/imports/collections';
// Import the 'editable' collections
import * as collections from '/common/imports/collections/index'

export default AppContainer = createContainer(() => {
  const pages = Meteor.subscribe('pages');
  const images = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');

  let subscriptions = []
  let subscriptionReady = pages.ready() && images.ready() && localizations.ready()

  Object.keys(collections).forEach(function(collection) {
    const subscription = Meteor.subscribe(collection)
    subscriptions.push(subscription);
    if (subscription.ready()==false) {
      subscriptionReady = false;
    }
  });

  return {
    subscriptionReady: subscriptionReady,
    pages: Pages.find({}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, App);
