import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Localizations } from '../../../../common/imports/collections';
import Jobs from '../../../../common/imports/collections/jobs';
import JobsList from '../../components/jobs/JobsList';

const JobsListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('jobs');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    collection: Jobs.find({}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, JobsList);

export default connect()(JobsListContainer);
