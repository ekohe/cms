import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import { Localizations } from '../../../../common/imports/collections';
import Projects from '../../../../common/imports/collections/projects';
import ProjectsList from '../../components/projects/ProjectsList';

const ProjectsListContainer = createContainer(() => {
  const subscription = Meteor.subscribe('projects');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: subscription.ready() && localizations.ready(),
    collection: Projects.find({}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, ProjectsList);

export default connect()(ProjectsListContainer);
