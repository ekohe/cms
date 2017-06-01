import Projects from '../../collections/projects'
import { Images } from '../../collections'

export default loadProjectsFixtures = () => {
  if (Projects.find().count() > 0) { return }

  console.log("Loading default projects...");

  Projects.insert({
    slug: 'kangu',
    name: {
      en: "Kangu",
      fr: "Kangu",
      cn: "Kangu",
      jp: "Kangu"
    },
    featured_on_homepage: false,
    logo: Images.find({path: '/aa77/kangu_logo.svg'}).fetch()[0]._id,
    small_picture: Images.find({path: '/658b/kangu_small_picture.jpg'}).fetch()[0]._id
  });

  Projects.insert({
    slug: 'figaro',
    name: {
      en: "Figaro",
      fr: "Figaro",
      cn: "Figaro",
      jp: "Figaro"
    },
    featured_on_homepage: false,
    logo: Images.find({path: '/197a/figaro_logo.png'}).fetch()[0]._id,
    small_picture: Images.find({path: '/cb19/figaro_small_picture.jpg'}).fetch()[0]._id
  });

  Projects.insert({
    slug: 'hbs',
    name: {
      en: "HBS",
      fr: "HBS",
      cn: "HBS",
      jp: "HBS"
    },
    featured_on_homepage: true,
    logo: Images.find({path: '/2a21/hbs_logo.svg'}).fetch()[0]._id,
    small_picture: Images.find({path: '/2809/hbs_small_picture.jpg'}).fetch()[0]._id
  });

  Projects.insert({
    slug: 'airpocalypse',
    name: {
      en: "Airpocalypse",
      fr: "Airpocalypse",
      cn: "Airpocalypse",
      jp: "Airpocalypse"
    },
    featured_on_homepage: true,
    logo: Images.find({path: '/13cd/airpocalypse_logo.svg'}).fetch()[0]._id,
    small_picture: Images.find({path: '/f6a7/airpocalypse_small_picture.jpg'}).fetch()[0]._id
  });

  Projects.insert({
    slug: 'lettrs',
    name: {
      en: "Lettrs",
      fr: "Lettrs",
      cn: "Lettrs",
      jp: "Lettrs"
    },
    featured_on_homepage: true,
    logo: Images.find({path: '/210a/lettrs_logo.png'}).fetch()[0]._id,
    small_picture: Images.find({path: '/7aba/lettrs_small_picture.jpg'}).fetch()[0]._id
  });

  Projects.insert({
    slug: 'pyro',
    name: {
      en: "Pyro",
      fr: "Pyro",
      cn: "Pyro",
      jp: "Pyro"
    },
    featured_on_homepage: true,
    logo: Images.find({path: '/1494/pyro_logo.svg'}).fetch()[0]._id,
    small_picture: Images.find({path: '/3ee2/pyro_small_picture.jpg'}).fetch()[0]._id
  });
}
