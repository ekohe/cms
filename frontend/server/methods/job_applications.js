import Jobs from '/common/imports/collections/jobs';

Meteor.methods({
  createJobApplication(attributes) {
    const job = Jobs.findOne({_id: attributes.jobId})

    if (job==null) {
      throw new Meteor.Error('error', "Can't find job with id: "+attributes.jobId);
    }

    const job_application = {
      _id: Meteor.uuid(),
      status: 'new',
      name: attributes.name,
      email: attributes.email,
      subject: attributes.subject,
      message: attributes.message,
      user_agent: attributes.user_agent,
      timezone_offset: attributes.timezone_offset,
      locale: attributes.locale,
      url: attributes.url,
      attachments: attributes.attachments,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return Jobs.update({_id: job._id}, {$push: {job_applications: job_application}});
  }
});
