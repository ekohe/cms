import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';

import DesignPages from '../pages/DesignPages.jsx';
import { Pages, Images, Localizations } from '/common/imports/collections';

const DesignPagesContainer = createContainer(({id}) => {
  const pagesSubscription = Meteor.subscribe('pages');
  const imagesSubscription = Meteor.subscribe('images');
  const localizations = Meteor.subscribe('localizations');
  return {
    subscriptionReady: pagesSubscription.ready() && imagesSubscription.ready() && localizations.ready(),
    page: Pages.findOne({_id: id}) || {},
    images: Images.find({}).fetch() || [],
    localizations: Localizations.find({}, {sort: {position: 1}}).fetch() || []
  };
}, DesignPages);

function mapStateToProps(state, ownProps) {
  return {id: ownProps.params.id, routes: ownProps.routes};
}

export default connect(mapStateToProps)(DesignPagesContainer);
