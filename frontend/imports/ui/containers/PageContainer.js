import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Page from '../pages/Page'

import { Images, Pages, Localizations } from '../../../common/imports/collections';

export default PageContainer = createContainer(() => {
  Meteor.subscribe('images');

  return {
    subscriptionReady: true,
    pages: Pages.find({}).fetch() || [],
    images: Images.find({}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, Page);
