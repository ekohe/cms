import TeamMembers from '../../collections/team_members'
import { Images } from '../../collections'

export default loadTeamMembersFixtures = () => {
  if (TeamMembers.find().count() > 0) { return }

  console.log("Loading default team members...");

  TeamMembers.insert({
    slug: 'maxence',
    first_name: 'Maxence',
    last_name: 'Noel',
    original_name: '',
    published: true,
    avatar: Images.find({path: '/5498/maxence.jpg'}).fetch()[0]._id,
    banner: Images.find({path: '/ee0a/shushana_banner.jpg'}).fetch()[0]._id,
    position: {
      'en': 'UX and Digital Strategy Consultant'
    },
    rank: 1,
    description: {
      'en': 'Shushana Jiang is an User Experience Designer and Digital Strategy Consultant with diverse background in Interactive Advertising, Application Design, and Business Marketing. She is inspired by client’s business goals and consumer problems to bring an analytical and innovative solution to complex products. Shushana has direct experience in automotive design, luxury fashion branding, cross platform campaigns, and digital product development. Her design and strategic implementations focus on business and consumer experience analysis to achieve high client success and consumer usage.'
    },
    links: [
      {'en': 'https://www.linkedin.com/in/maxence-noel-4014384a'},
      {'en': 'https://github.com/silitix'}
    ]
  });
}
