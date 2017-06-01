import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Collections
import { Images } from '/common/imports/collections'
import TeamMembers from '/common/imports/collections/team_members'

// Helpers
import imageUrl from '/common/imports/helpers/imageUrl'
import { rebuildRouteWithLocale } from '/common/imports/routing'
import stringProp from '/common/imports/properties/stringProp'

// Components
import { Link } from 'react-router';

export default class TeamMemberComponent extends React.Component {
  render() {
    const { team_member_id, locale } = this.props;

    const teamMember = TeamMembers.findOne({_id: team_member_id})

    return (
      <div className="team_member_component">
        <Link to={rebuildRouteWithLocale("/"+teamMember.slug, locale)}>
          <div className="avatar">
            <div className="bg" style={teamMember.avatar==null ? null : {background: "url("+imageUrl(teamMember.avatar)+")"}}></div>
          </div>
          <div className="name">{[(teamMember.first_name||''), (teamMember.last_name||'')].join(" ")}</div>
          <div className="position">{teamMember.position[locale]}</div>
        </Link>
      </div>
    );
  }

  preview() {
    const { team_member_id, locale } = this.props;

    return team_member_id
  }
}

TeamMemberComponent.propTypes = {
  team_member_id: stringProp,
  locale: React.PropTypes.string.isRequired
}
