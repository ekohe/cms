import { Images } from '../../collections'

export default loadImagesFixtures = () => {
  if (Images.find({path: '/af9f/logo.svg'}).fetch()[0]==null) {
    console.log("Creating logo.svg")
    Images.insert({
      size:8492,
      path:"/af9f/logo.svg",
      filename:"logo.svg",
      name:"Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/37c7/airpocalypse screenshots.jpg'}).fetch()[0]==null) {
    console.log("Creating airpocalypse screenshots.jpg")
    Images.insert({
      size:124458,
      path:"/37c7/airpocalypse screenshots.jpg",
      filename:"airpocalypse screenshots.jpg",
      name:"Airpocalypse Screenshots",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/0878/vancouver.jpg'}).fetch()[0]==null) {
    console.log("Creating vancouver.jpg")
    Images.insert({
      size:564390,
      path:"/0878/vancouver.jpg",
      filename:"vancouver.jpg",
      name:"Vancouver Landscape",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/f48f/team_icon.svg'}).fetch()[0]==null) {
    console.log("Creating team_icon.svg")
    Images.insert({
      size:8710,
      path:"/f48f/team_icon.svg",
      filename:"team_icon.svg",
      name:"Team icon",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/c537/project_icon.svg'}).fetch()[0]==null) {
    console.log("Creating project_icon.svg")
    Images.insert({
      size:1943,
      path:"/c537/project_icon.svg",
      filename:"project_icon.svg",
      name:"Project icon",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/4be3/Jingan_Temple.jpg'}).fetch()[0]==null) {
    console.log("Creating Jingan_Temple.jpg")
    Images.insert({
      size:695249,
      path:"/4be3/Jingan_Temple.jpg",
      filename:"Jingan_Temple.jpg",
      name:"Jingan Temple",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/8052/bcg.svg'}).fetch()[0]==null) {
    console.log("Creating bcg.svg")
    Images.insert({
      size:22915,
      path:"/8052/bcg.svg",
      filename:"bcg.svg",
      name:"bcg logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/f5ed/rocketfuel-logo.svg'}).fetch()[0]==null) {
    console.log("Creating rocketfuel-logo.svg")
    Images.insert({
      size:27386,
      path:"/f5ed/rocketfuel-logo.svg",
      filename:"rocketfuel-logo.svg",
      name:"Rocketfuel Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/8230/design_icon.svg'}).fetch()[0]==null) {
    console.log("Creating design_icon.svg")
    Images.insert({
      size:4435,
      path:"/8230/design_icon.svg",
      filename:"design_icon.svg",
      name:"Design icon",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/0e82/dev_icon.svg'}).fetch()[0]==null) {
    console.log("Creating dev_icon.svg")
    Images.insert({
      size:3983,
      path:"/0e82/dev_icon.svg",
      filename:"dev_icon.svg",
      name:"Development icon",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/ea0f/plan_icon.svg'}).fetch()[0]==null) {
    console.log("Creating plan_icon.svg")
    Images.insert({
      size:5009,
      path:"/ea0f/plan_icon.svg",
      filename:"plan_icon.svg",
      name:"Plan icon",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/96bb/swift_logo.svg'}).fetch()[0]==null) {
    console.log("Creating swift_logo.svg")
    Images.insert({
      size:5775,
      path:"/96bb/swift_logo.svg",
      filename:"swift_logo.svg",
      name:"Swift logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/bed2/rails_logo.svg'}).fetch()[0]==null) {
    console.log("Creating rails_logo.svg")
    Images.insert({
      size:11289,
      path:"/bed2/rails_logo.svg",
      filename:"rails_logo.svg",
      name:"Rails logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/524a/paid_lunch.svg'}).fetch()[0]==null) {
    console.log("Creating paid_lunch.svg")
    Images.insert({
      size:4952,
      path:"/524a/paid_lunch.svg",
      filename:"paid_lunch.svg",
      name:"Paid Lunch",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/74cb/awesome_party.svg'}).fetch()[0]==null) {
    console.log("Creating awesome_party.svg")
    Images.insert({
      size:7535,
      path:"/74cb/awesome_party.svg",
      filename:"awesome_party.svg",
      name:"Awesome Party",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/fdc9/active_projects.svg'}).fetch()[0]==null) {
    console.log("Creating active_projects.svg")
    Images.insert({
      size:5562,
      path:"/fdc9/active_projects.svg",
      filename:"/active_projects.svg",
      name:"Active Projects",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/0028/app_downloads.svg'}).fetch()[0]==null) {
    console.log("Creating app_downloads.svg")
    Images.insert({
      size:4264,
      path:"/0028/app_downloads.svg",
      filename:"app_downloads.svg",
      name:"App Downloads",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/d57c/product_launches.svg'}).fetch()[0]==null) {
    console.log("Creating product_launches.svg")
    Images.insert({
      size:3810,
      path:"/d57c/product_launches.svg",
      filename:"product_launches.svg",
      name:"Product Launches",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/e3ad/team_members.svg'}).fetch()[0]==null) {
    console.log("Creating team_members.svg")
    Images.insert({
      size:21334,
      path:"/e3ad/team_members.svg",
      filename:"team_members.svg",
      name:"Team Members",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/8aae/develop_process.svg'}).fetch()[0]==null) {
    console.log("Creating develop_process.svg")
    Images.insert({
      size:32339,
      path:"/8aae/develop_process.svg",
      filename:"develop_process.svg",
      name:"Develop Process",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/dfd7/design_process.svg'}).fetch()[0]==null) {
    console.log("Creating design_process.svg")
    Images.insert({
      size:59219,
      path:"/dfd7/design_process.svg",
      filename:"design_process.svg",
      name:"Design Process",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }


  if (Images.find({path: '/f850/culture01.jpg'}).fetch()[0]==null) {
    console.log("Creating culture01.jpg")
    Images.insert({
      size:22335,
      path:"/f850/culture01.jpg",
      filename:"culture01.jpg",
      name:"Culture 01",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/0ae8/culture02.jpg'}).fetch()[0]==null) {
    console.log("Creating culture02.jpg")
    Images.insert({
      size:19818,
      path:"/0ae8/culture02.jpg",
      filename:"culture02.jpg",
      name:"Culture 02",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/3ef7/culture03.jpg'}).fetch()[0]==null) {
    console.log("Creating culture03.jpg")
    Images.insert({
      size:26777,
      path:"/3ef7/culture03.jpg",
      filename:"culture03.jpg",
      name:"Culture 03",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/a2b6/culture04.jpg'}).fetch()[0]==null) {
    console.log("Creating culture04.jpg")
    Images.insert({
      size:25119,
      path:"/a2b6/culture04.jpg",
      filename:"culture04.jpg",
      name:"Culture 04",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/2475/culture05.jpg'}).fetch()[0]==null) {
    console.log("Creating culture05.jpg")
    Images.insert({
      size:21744,
      path:"/2475/culture05.jpg",
      filename:"culture05.jpg",
      name:"Culture 05",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/6de3/paris_small.jpg'}).fetch()[0]==null) {
    console.log("Creating paris_small.jpg")
    Images.insert({
      size:304436,
      path:"/6de3/paris_small.jpg",
      filename:"paris_small.jpg",
      name:"Paris Small",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/f3e2/tokyo_small.jpg'}).fetch()[0]==null) {
    console.log("Creating tokyo_small.jpg")
    Images.insert({
      size:304436,
      path:"/f3e2/tokyo_small.jpg",
      filename:"tokyo_small.jpg",
      name:"Tokyo Small",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/df0d/shanghai_small.jpg'}).fetch()[0]==null) {
    console.log("Creating shanghai_small.jpg")
    Images.insert({
      size:562313,
      path:"/df0d/shanghai_small.jpg",
      filename:"shanghai_small.jpg",
      name:"Shanghai Small",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/99d0/vancouver_small.jpg'}).fetch()[0]==null) {
    console.log("Creating vancouver_small.jpg")
    Images.insert({
      size:242427,
      path:"/99d0/vancouver_small.jpg",
      filename:"vancouver_small.jpg",
      name:"Vancouver Small",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/210a/lettrs_logo.png'}).fetch()[0]==null) {
    console.log("Creating lettrs_logo.png")
    Images.insert({
      size:10216,
      path:"/210a/lettrs_logo.png",
      filename:"lettrs_logo.png",
      name:"Lettrs Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/2a21/hbs_logo.svg'}).fetch()[0]==null) {
    console.log("Creating hbs_logo.svg")
    Images.insert({
      size:2433,
      path:"/2a21/hbs_logo.svg",
      filename:"hbs_logo.svg",
      name:"HBS Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/197a/figaro_logo.png'}).fetch()[0]==null) {
    console.log("Creating figaro_logo.png")
    Images.insert({
      size:10112,
      path:"/197a/figaro_logo.png",
      filename:"figaro_logo.png",
      name:"Figaro Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/13cd/airpocalypse_logo.svg'}).fetch()[0]==null) {
    console.log("Creating airpocalypse_logo.svg")
    Images.insert({
      size:3605,
      path:"/13cd/airpocalypse_logo.svg",
      filename:"airpocalypse_logo.svg",
      name:"Airpocalypse Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/aa77/kangu_logo.svg'}).fetch()[0]==null) {
    console.log("Creating kangu_logo.svg")
    Images.insert({
      size:3587,
      path:"/aa77/kangu_logo.svg",
      filename:"kangu_logo.svg",
      name:"Kangu Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/1494/pyro_logo.svg'}).fetch()[0]==null) {
    console.log("Creating pyro_logo.svg")
    Images.insert({
      size:2018,
      path:"/1494/pyro_logo.svg",
      filename:"pyro_logo.svg",
      name:"Pyro Logo",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/7aba/lettrs_small_picture.jpg'}).fetch()[0]==null) {
    console.log("Creating lettrs_small_picture.jpg")
    Images.insert({
      size:177378,
      path:"/7aba/lettrs_small_picture.jpg",
      filename:"lettrs_small_picture.jpg",
      name:"Lettrs small picture",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/2809/hbs_small_picture.jpg'}).fetch()[0]==null) {
    console.log("Creating hbs_small_picture.jpg")
    Images.insert({
      size:374014,
      path:"/2809/hbs_small_picture.jpg",
      filename:"hbs_small_picture.jpg",
      name:"HBS small picture",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/cb19/figaro_small_picture.jpg'}).fetch()[0]==null) {
    console.log("Creating figaro_small_picture.jpg")
    Images.insert({
      size:408536,
      path:"/cb19/figaro_small_picture.jpg",
      filename:"figaro_small_picture.jpg",
      name:"Figaro small picture",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/f6a7/airpocalypse_small_picture.jpg'}).fetch()[0]==null) {
    console.log("Creating airpocalypse_small_picture.jpg")
    Images.insert({
      size:119102,
      path:"/f6a7/airpocalypse_small_picture.jpg",
      filename:"airpocalypse_small_picture.jpg",
      name:"Airpocalypse small picture",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/658b/kangu_small_picture.jpg'}).fetch()[0]==null) {
    console.log("Creating kangu_small_picture.jpg")
    Images.insert({
      size:229670,
      path:"/658b/kangu_small_picture.jpg",
      filename:"kangu_small_picture.jpg",
      name:"Kangu small picture",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/3ee2/pyro_small_picture.jpg'}).fetch()[0]==null) {
    console.log("Creating pyro_small_picture.jpg")
    Images.insert({
      size:240377,
      path:"/3ee2/pyro_small_picture.jpg",
      filename:"pyro_small_picture.jpg",
      name:"Pyro small picture",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/59fa/marker.png'}).fetch()[0]==null) {
    console.log("Creating marker.png")
    Images.insert({
      size:2267,
      path:"/59fa/marker.png",
      filename:"marker.png",
      name:"Marker",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/5498/maxence.jpg'}).fetch()[0]==null) {
    console.log("Creating maxence.jpg")
    Images.insert({
      size:35332,
      path:"/5498/maxence.jpg",
      filename:"maxence.jpg",
      name:"Maxence Avatar",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/27b0/shushana.jpg'}).fetch()[0]==null) {
    console.log("Creating shushana.jpg")
    Images.insert({
      size:15015,
      path:"/27b0/shushana.jpg",
      filename:"shushana.jpg",
      name:"Shushana Avatar",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/ee0a/shushana_banner.jpg'}).fetch()[0]==null) {
    console.log("Creating shushana_banner.jpg")
    Images.insert({
      size:541291,
      path:"/ee0a/shushana_banner.jpg",
      filename:"shushana_banner.jpg",
      name:"Shushana Banner",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/b8fe/linkedin.svg'}).fetch()[0]==null) {
    console.log("Creating linkedin.svg")
    Images.insert({
      size:274,
      path:"/b8fe/linkedin.svg",
      filename:"linkedin.svg",
      name:"Linkedin",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/6b22/twitter.svg'}).fetch()[0]==null) {
    console.log("Creating twitter.svg")
    Images.insert({
      size:280,
      path:"/6b22/twitter.svg",
      filename:"twitter.svg",
      name:"Twitter",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/ba69/facebook.svg'}).fetch()[0]==null) {
    console.log("Creating facebook.svg")
    Images.insert({
      size:274,
      path:"/ba69/facebook.svg",
      filename:"facebook.svg",
      name:"Facebook",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  if (Images.find({path: '/ac48/IMG_0824.jpg'}).fetch()[0]==null) {
    console.log("Creating laptop and mouse.jpg")
    Images.insert({
      size:102417,
      path:"/ac48/IMG_0824.jpg",
      filename:"IMG_0824.jpg",
      name:"Laptop and mouse.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  // Add new fixtures here, on this format:

  //  if (Images.find({path: ' <add your picture path here>   '}).fetch()[0]==null) {
  //   console.log("Creating logo.svg")
  //
  //   Images.insert({
  //     size: 0,
  //     path: "",
  //     filename: "",
  //     name: "",
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   })
  //  }
}
