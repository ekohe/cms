import TeamMembers from '/common/imports/collections/team_members';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createTeamMember(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting team members with same slug
    const team_member = TeamMembers.insert({
      slug: attributes.slug,
      first_name: attributes.first_name,
      last_name: attributes.last_name,
      published: attributes.published,
      original_name: attributes.original_name,
      position: attributes.position,
      rank: parseInt(attributes.rank),
      avatar: attributes.avatar,
      banner: attributes.banner,
      description: attributes.description,
      links: attributes.links,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return team_member;
  },

  updateTeamMember(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting team members with same slug
    return TeamMembers.update({_id: id},
                          {$set: {slug: attributes.slug,
                                  first_name: attributes.first_name,
                                  last_name: attributes.last_name,
                                  published: attributes.published,
                                  original_name: attributes.original_name,
                                  position: attributes.position,
                                  rank: parseInt(attributes.rank),
                                  avatar: attributes.avatar,
                                  banner: attributes.banner,
                                  description: attributes.description,
                                  links: attributes.links,
                                  updatedAt: new Date()}});
  },

  deleteTeamMember(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return TeamMembers.remove(id)
  }
});
