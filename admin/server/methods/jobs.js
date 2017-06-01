import Jobs from '/common/imports/collections/jobs';
import isAuthorized from '/imports/helpers/isAuthorized'

Meteor.methods({
  createJob(attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting jobs with same slug
    const job = Jobs.insert({
      slug: attributes.slug,
      position: attributes.position,
      published: attributes.published,
      cities: attributes.cities,
      banner: attributes.banner,
      description: attributes.description,
      responsibilities_title: attributes.responsibilities_title,
      responsibilities: attributes.responsibilities,
      skills_title: attributes.skills_title,
      skills: attributes.skills,
      benefits_title: attributes.benefits_title,
      benefits: attributes.benefits,
      locations: attributes.locations,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return job;
  },

  updateJob(id, attributes) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    // TODO: check for any conflicting jobs with same slug
    return Jobs.update({_id: id},
                          {$set: {slug: attributes.slug,
                                  position: attributes.position,
                                  published: attributes.published,
                                  cities: attributes.cities,
                                  banner: attributes.banner,
                                  description: attributes.description,
                                  responsibilities_title: attributes.responsibilities_title,
                                  responsibilities: attributes.responsibilities,
                                  skills_title: attributes.skills_title,
                                  skills: attributes.skills,
                                  benefits_title: attributes.benefits_title,
                                  benefits: attributes.benefits,
                                  locations: attributes.locations,
                                  updatedAt: new Date()}});
  },
  updateJobApplicationStatus(id, application_id, application_created_at, status) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }

    const job = Jobs.findOne({_id: id})

    if (job==null) {
      throw new Meteor.Error('error', "Can't find job with id: "+id);
    }

    let job_applications = job.job_applications
    for (let application of job_applications) {
      if (application_id) {
        if (application_id === application._id) {
          application.status = status
          break
        }
      } else {
        if (application_created_at.getTime() === application.createdAt.getTime()) {
          application.status = status
          break
        }
      }
    }

    return Jobs.update({_id: id}, {$set: {job_applications: job_applications}})
  },
  deleteJobApplication(id, application_id, application_created_at) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    const job = Jobs.findOne({_id: id})

    if (job==null) {
      throw new Meteor.Error('error', "Can't find job with id: "+id);
    }

    let job_applications = job.job_applications
    let index = 0
    let found = false
    for (let application of job_applications) {
      if (application_id) {
        if (application_id === application._id) {
          found = true
          break
        }
      } else {
        if (application_created_at.getTime() === application.createdAt.getTime()) {
          found = true
          break
        }
      }
      index++
    }

    job_applications.splice(index, 1)
    return Jobs.update({_id: id}, {$set: {job_applications: job_applications}})
  },
  deleteJob(id) {
    if (!isAuthorized()) { throw new Meteor.Error('unauthorized', "User is not authorized"); }
    return Jobs.remove(id)
  },
});
