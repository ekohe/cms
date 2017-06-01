import React from 'react';

// Collections
import { Images } from '/common/imports/collections';
import Projects from '/common/imports/collections/projects';

// Helpers
import imageUrl from '/common/imports/helpers/imageUrl'
import { rebuildRouteWithLocale } from '/common/imports/routing';

// Properties
import booleanProp from '/common/imports/properties/booleanProp'

// Components
import { Link } from 'react-router';

export default class ProjectsGridComponent extends React.Component {
  render() {
    const { collection, element, locale, featured_only, manual_projects, projects } = this.props;

    let projectLists

    if (manual_projects) {
      projectLists = Projects.find({slug: { $in: projects||[] } } ).fetch()
    } else {
      if (featured_only) {
        projectLists = Projects.find({featured_on_homepage: true}).fetch()
      } else {
        projectLists = Projects.find().fetch()
      }
    }

    return (
      <div className={'projects_grid_component projects_'+projectLists.length }>
        {projectLists.map((project) =>
          <div key={"project_"+project._id} className="project">
            <Link to={rebuildRouteWithLocale("/projects/"+project.slug, locale)}>
              <div className="bg" style={project.small_picture==null ? null : {background: "url("+imageUrl(project.small_picture)+")"}}>
              </div>
              <div className='logo' style={project.logo==null ? null : {background: "url("+imageUrl(project.logo)+") no-repeat center center"}}></div>
            </Link>
          </div>
        )}
      </div>
    );
  }

  preview() {
    const { featured_only, manual_projects, projects } = this.props;
    if (manual_projects) {
      return projects.toString()
    } else {
      if (featured_only) {
        return "Only featured projects"
      } else {
        return "All projects"
      }
    }
  }
}

ProjectsGridComponent.propTypes = {
  featured_only: booleanProp,
  manual_projects: booleanProp,
  projects: arrayOfStringsProp,
  locale: React.PropTypes.string.isRequired
}
