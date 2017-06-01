import Projects from '/common/imports/collections/projects';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createProject(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting projects with same slug
    const project = Projects.insert({
      slug: attributes.slug,
      name: attributes.name,
      logo: attributes.logo,
      small_picture: attributes.small_picture,
      featured_on_homepage: attributes.featured_on_homepage,
      project_type: attributes.project_type,
      banner: attributes.banner,
      pictures: attributes.pictures,
      subtitle: attributes.subtitle,
      description: attributes.description,
      key_features: attributes.key_features,
      services: attributes.services,
      technologies: attributes.technologies,
      links_labels: attributes.links_labels,
      links_urls: attributes.links_urls,
      links_types: attributes.links_types,
      meta_description: attributes.meta_description,
      meta_keywords: attributes.meta_keywords,
      page_title: attributes.page_title,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return project;
  },

  updateProject(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting projects with same slug
    return Projects.update({_id: id},
                          {$set: {slug: attributes.slug,
                                  name: attributes.name,
                                  logo: attributes.logo,
                                  small_picture: attributes.small_picture,
                                  featured_on_homepage: attributes.featured_on_homepage,
                                  project_type: attributes.project_type,
                                  banner: attributes.banner,
                                  pictures: attributes.pictures,
                                  subtitle: attributes.subtitle,
                                  description: attributes.description,
                                  key_features: attributes.key_features,
                                  services: attributes.services,
                                  technologies: attributes.technologies,
                                  links_labels: attributes.links_labels,
                                  links_urls: attributes.links_urls,
                                  links_types: attributes.links_types,
                                  meta_description: attributes.meta_description,
                                  meta_keywords: attributes.meta_keywords,
                                  page_title: attributes.page_title,
                                  updatedAt: new Date()}});
  },

  deleteProject(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Projects.remove(id)
  }
});
