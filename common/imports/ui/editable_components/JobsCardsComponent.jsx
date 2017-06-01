import React from 'react';
import { findDOMNode } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

// Collections
import { Images } from '/common/imports/collections';
import Jobs from '/common/imports/collections/jobs';
import Offices from '/common/imports/collections/offices';

// Helpers
import imageUrl from '/common/imports/helpers/imageUrl'
import { rebuildRouteWithLocale } from '/common/imports/routing';

// Components
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import JobCardComponent from './JobCardComponent';

import translatedStringProp from '/common/imports/properties/translatedStringProp';

class JobsCardsComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      jobCards: [],
      firstHeight: 0,
      secondHeight: 0
    }
  }

  componentDidMount() {

    let heights = this.state.jobCards.map( item =>
      findDOMNode(item).clientHeight
    )
    firstHeight = heights[0] > heights[1] ? heights[0] : heights[1]
    secondHeight = heights[2] > heights[3] ? heights[2] : heights[3]

    this.setState({firstHeight, secondHeight})
  }

  setRef(el) {
    this.state.jobCards.push(el)
  }

  render() {
    const { jobs, button_label, cities_available, offices, locale } = this.props;

    return (
      <div className={'container jobs_'+jobs.length }>
        {jobs.map((job, index) => {

          let cityNames = []
          for (let i=0; i<job.cities.length; i++) {
            let office = Offices.findOne({slug: job.cities[i]})
            if (office != null && office != '') {
              cityNames.push(office.city[locale])
            }
          }

          let citiesStr = cityNames.join(', ')

          let url = {}
          url[locale] = rebuildRouteWithLocale("/jobs/"+job.slug, locale)

          return (
            <JobCardComponent
              maxHeight={index < 2 ? this.firstHeight : this.state.secondHeight}
              ref={(el)=>this.setRef(el)}
              key={"job_"+job._id}
              title={job.position}
              button_label={button_label}
              url={url}
              image={job.banner}
              text={job.description}
              cities_available={cities_available}
              cities={citiesStr}
              locale={locale}
            />
          )
        })}
      </div>
    );
  }

  preview() {
    // Nothing to preview because there are no attributes
    //  (coming from jobs collection)
    return null
  }
}

JobsCardsComponent.propTypes = {
  button_label: translatedStringProp,
  cities_available: translatedStringProp,
  locale: React.PropTypes.string.isRequired
}


export default JobsCardsComponentContainer = createContainer(() => {
  return {
    jobs: Jobs.find().fetch()
  };
}, JobsCardsComponent);
