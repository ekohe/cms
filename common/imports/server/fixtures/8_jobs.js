import Jobs from '../../collections/jobs'
import Offices from '../../collections/offices'
import { Images } from '../../collections'

export default loadJobsFixtures = () => {
  if (Jobs.find().count() > 0) { return }

  console.log("Loading default jobs...");

  Jobs.insert({
    slug: 'project-manager',
    published: true,
    position: {
      'en': 'Project Manager'
    },
    banner: Images.find({path: '/ac48/IMG_0824.jpg'}).fetch()[0]._id,
    description: {
      'en': 'Project Manager manages projects'
    },
    responsibilities_title: {
      'en': 'Responsibilities'
    },
    responsibilities: [
      {
        'en': 'First responsibility'
      },
      {
        'en': 'Second responsibility'
      }
    ],
    skills_title: {
      'en': 'Skills'
    },
    skills: [
      {
        'en': 'Some skill'
      },
      {
        'en': 'Some other skill'
      }
    ],
    benefits_title: {
      'en': 'Benefits'
    },
    benefits: [
      {
        'en': 'Some benefit'
      },
      {
        'en': 'Some other benefit'
      }],
    locations: [Offices.find({slug: 'shanghai'}).fetch()[0]._id, Offices.find({slug: 'tokyo'}).fetch()[0]._id],
    job_applications: []
  });
}
