import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Collections
import { Images } from '/common/imports/collections'
import TeamMembers from '/common/imports/collections/team_members'

// Helpers
import imageUrl from '/common/imports/helpers/imageUrl'
import { rebuildRouteWithLocale } from '/common/imports/routing'

// Components
import { Link } from 'react-router';
import TeamMemberComponent from './TeamMemberComponent'

class TeamComponent extends React.Component {
  render() {
    const { team_members, locale } = this.props;

    return (
      <div className='team_component'>
        {team_members.map((team_member) =>
          <TeamMemberComponent key={"team_member_"+team_member._id} team_member_id={team_member._id} locale={locale}/>
        )}
      </div>
    );
  }

  preview() {
    return null
  }
}

TeamComponent.propTypes = {
  locale: React.PropTypes.string.isRequired
}

const TeamComponentContainer = createContainer(({collection, element}) => {
  let team_members = []

  if (collection && element) {
    // Get the next 6 and if there's not, the first x to fill the gap
    const team_member_rank = element.rank
    team_members = TeamMembers.find({published: true, rank:{$gt: team_member_rank}}, {sort: {rank: 1}, limit: 6}).fetch()

    if (team_members.length<6) {
      const remaining = 6-team_members.length
      team_members = [...team_members, ...TeamMembers.find({published: true}, {sort: {rank: 1}, limit: remaining}).fetch()]
    }

  } else {
    team_members = TeamMembers.find({published: true}, {sort: {rank: 1}}).fetch()
  }
  return { team_members };
}, TeamComponent);


export default TeamComponentContainer;
