import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import BannerImageComponent from '/common/imports/ui/editable_components/BannerImageComponent'
import TextComponent from '/common/imports/ui/editable_components/TextComponent'
import CenteredImageComponent from '/common/imports/ui/editable_components/CenteredImageComponent'
import ButtonComponent from '/common/imports/ui/editable_components/ButtonComponent'
import ContactFormComponent from '/common/imports/ui/editable_components/ContactFormComponent'
import CallToActionComponent from '/common/imports/ui/editable_components/CallToActionComponent'
import TextImageCoverComponent from '/common/imports/ui/editable_components/TextImageCoverComponent'
import VerticalImageListComponent from '/common/imports/ui/editable_components/VerticalImageListComponent'
import BulletPointsComponent from '/common/imports/ui/editable_components/BulletPointsComponent'
import ThreeColumnsComponent from '/common/imports/ui/editable_components/ThreeColumnsComponent'
import TwoColumnsComponent from '/common/imports/ui/editable_components/TwoColumnsComponent'
import PaperContentComponent from '/common/imports/ui/editable_components/PaperContentComponent'
import TestimonialsComponent from '/common/imports/ui/editable_components/TestimonialsComponent'
import JobCardComponent from '/common/imports/ui/editable_components/JobCardComponent'
import IconsSetComponent from '/common/imports/ui/editable_components/IconsSetComponent'
import TextImageSideBySideComponent from '/common/imports/ui/editable_components/TextImageSideBySideComponent'
import FilmstripGalleryComponent from '/common/imports/ui/editable_components/FilmstripGalleryComponent'
import OfficesGridComponent from '/common/imports/ui/editable_components/OfficesGridComponent'
import ProjectsGridComponent from '/common/imports/ui/editable_components/ProjectsGridComponent'
import OfficeMapComponent from '/common/imports/ui/editable_components/OfficeMapComponent'
import JobApplicationComponent from '/common/imports/ui/editable_components/JobApplicationComponent'
import OfficeCardComponent from '/common/imports/ui/editable_components/OfficeCardComponent'
import OfficesCardsComponent from '/common/imports/ui/editable_components/OfficesCardsComponent'
import TeamComponent from '/common/imports/ui/editable_components/TeamComponent'
import SlideShowComponent from '/common/imports/ui/editable_components/SlideShowComponent'
import OfficeContactComponent from '/common/imports/ui/editable_components/OfficeContactComponent'


// Collections
import { Images } from '/common/imports/collections'
import Jobs from '/common/imports/collections/jobs'

class StyleGuide extends React.Component {
  render() {
    const bannerImage = Images.find({path: '/0878/vancouver.jpg'}).fetch()[0]
    const image = Images.find({path: '/37c7/airpocalypse screenshots.jpg'}).fetch()[0]
    const teamIcon = Images.find({path: '/f48f/team_icon.svg'}).fetch()[0]
    const projectIcon = Images.find({path: '/c537/project_icon.svg'}).fetch()[0]
    const ImageCover = Images.find({path: '/4be3/Jingan_Temple.jpg'}).fetch()[0]
    const rocketfuel = Images.find({path: '/f5ed/rocketfuel-logo.svg'}).fetch()[0]
    const bcg = Images.find({path: '/8052/bcg.svg'}).fetch()[0]
    const planIcon = Images.find({path: '/ea0f/plan_icon.svg'}).fetch()[0]
    const devIcon = Images.find({path: '/0e82/dev_icon.svg'}).fetch()[0]
    const designIcon = Images.find({path: '/8230/design_icon.svg'}).fetch()[0]
    const swiftLogo = Images.find({path: '/96bb/swift_logo.svg'}).fetch()[0]
    const railsLogo = Images.find({path: '/bed2/rails_logo.svg'}).fetch()[0]
    const paidLunch = Images.find({path: '/524a/paid_lunch.svg'}).fetch()[0]
    const awesomeParty = Images.find({path: '/74cb/awesome_party.svg'}).fetch()[0]
    const teamMembers = Images.find({path: '/e3ad/team_members.svg'}).fetch()[0]
    const productLaunches = Images.find({path: '/d57c/product_launches.svg'}).fetch()[0]
    const activeProjects = Images.find({path: '/fdc9/active_projects.svg'}).fetch()[0]
    const appDownloads = Images.find({path: '/0028/app_downloads.svg'}).fetch()[0]
    const design = Images.find({path: '/dfd7/design_process.svg'}).fetch()[0]
    const develop = Images.find({path: '/8aae/develop_process.svg'}).fetch()[0]
    const culture01 = Images.find({path: '/f850/culture01.jpg'}).fetch()[0]
    const culture02 = Images.find({path: '/0ae8/culture02.jpg'}).fetch()[0]
    const culture03 = Images.find({path: '/3ef7/culture03.jpg'}).fetch()[0]
    const culture04 = Images.find({path: '/a2b6/culture04.jpg'}).fetch()[0]
    const culture05 = Images.find({path: '/2475/culture05.jpg'}).fetch()[0]
    const airpocalypseLogo = Images.find({path: '/13cd/airpocalypse_logo.svg'}).fetch()[0]
    const Facebook = Images.find({path: '/ba69/facebook.svg'}).fetch()[0]
    const Twitter = Images.find({path: '/6b22/twitter.svg'}).fetch()[0]
    const Linkedin = Images.find({path: '/b8fe/linkedin.svg'}).fetch()[0]
    const job = Jobs.find({slug: 'project-manager'}).fetch()[0]

    return (
      <div>
        <div className="component">
          {bannerImage!=null && <BannerImageComponent image={bannerImage._id} title={{'en': 'We help you create clever digital products with simplicity in mind.'}} locale='en' />}
        </div>

        <div className="component">
          <TextComponent title={{'en': 'About Ekohe'}} subtitle={{'en': 'We are made up of talented creatives, thoughtful engineers, smart strategists and detail-obsessed do’ers who enjoy nothing more than turning ideas into reality.'}} text={{'en': 'We are a global digital agency with over 30 people in 4 offices with over 10 years history of making clever digital products with simplicity in mind.  We are dedicated to using technology in a smart way to create useful, beautiful work with your brand and users at the core. We’re serious about what we do but we try not to take ourselves seriously. Passionate, driven, curious, talented and honest but no egos. Our headquarters are in Shanghai and we have branches in Tokyo, Paris and Vancouver. '}} locale='en' />
        </div>

        <div className="component">
          <p>Slide Show Component:</p>
          <SlideShowComponent images={[projectIcon._id, teamIcon._id, culture01._id, designIcon._id, paidLunch._id]} locale='en' />
        </div>

        <div className="component">
          <p>Three Column Component:</p>
          <ThreeColumnsComponent title1={{'en': "PLAN"}}
                                 title2={{'en': "DESIGN"}}
                                 title3={{'en': "DEVELOPMENT"}}
                                 image1={planIcon._id}
                                 image2={designIcon._id}
                                 image3={devIcon._id}
                                 text1={{'en': "We begin our process by consuming ourselves in your industry, understanding the problems your product is trying to solve and how to tailor a solution that fits the requirements exactly."}}
                                 text2={{'en': "Nothing upsets us more than products that are beautiful but not useful. Our teams work closely together throughout the journey to make sure this never happens and that our designs are both beautiful and useful."}}
                                 text3={{'en': "We pride ourselves in not using ready-made solutions. Everything is tailored to exactly what you’re trying to achieve. No compromises required. This keeps our code clean, functional and useful."}}
                                 buttonLabel={{'en': 'SOLUTIONS'}}
                                 url={{'en': '/styleguide'}}
                                 locale='en' />
        </div>

        <div className="component">
          <p>Bullet Points Component:</p>
          <BulletPointsComponent title={{'en': "Responsibilities"}}
                                 points={[{'en': "Collaborates with the project team to identify strategies and solutions that will best meet the client’s needs within established constraints."}, {'en': "Estimate costs and timing for tasks such as project strategy, UX and UI design, technology requirements, etc., utilizing established estimating process and tools.."}, {'en': "Actively participates in all project activities, collaborating on the content and presentation of key client deliverables as required ensuring relevancy, strategy, quality and timelines."}, {'en': "Responsible for managing project financial lifecycle, including estimates and invoicing"}, {'en': "Creates and maintains project documentation on a wiki such as proposals, project plans, statements of work, status reports, meeting minutes, functional specifications, etc."}]}
                                 locale='en' />
        </div>

        <div className="component">
          <p>Centered Image Component:</p>
          <CenteredImageComponent images={[ImageCover._id]}
                                  links={['']}
          />
        </div>

        <div className="component">
          <p>Social Icons Component:</p>
          <CenteredImageComponent images={[Facebook._id, Twitter._id, Linkedin._id]}
                                  links={['', '', '']}
          />
        </div>

        <div className="component">
          <p>Button Component:</p>
          <ButtonComponent title={{'en': 'Do something'}} url={{'en': '/styleguide#button_clicked'}} locale='en' />
        </div>

        <div className="component">
          <p>Text Image Cover Component:</p>
          <TextImageCoverComponent caption={{'en': 'SHANGHAI, CHINA'}}
                                   image={ImageCover._id}
                                   title={{'en': "Get to know us."}}
                                   text={{'en': "We are a global digital agency with over 30 people across 4 vibrant cities around the world. Our headquarters are in Shanghai and we have branches in Tokyo, Paris and Vancouver. "}}
                                   buttonLabel={{'en': 'ABOUT'}}
                                   url={{'en': '/styleguide#button_clicked'}}
                                   locale='en' />
        </div>

        <div className="component">
          <p>Contact Form Component:</p>
          <ContactFormComponent title={{'en': 'Hello. 你好. 今日は. Bonjour.'}}
                                text={{'en': "We'd love to meet and hear from you! Fill out the form or email us at "}}
                                emailAddress={{'en': 'info@ekohe.com'}}
                                nameLabel={{'en': 'Your Name'}}
                                emailLabel={{'en': 'Email'}}
                                subjectLabel={{'en': 'Subject'}}
                                messageLabel={{'en': 'Message'}}
                                sendButtonLabel={{'en': 'Send'}}
                                emailMissingErrorMessage={{'en': 'Email address is required'}}
                                emailInvalidErrorMessage={{'en': 'Email address is invalid'}}
                                thankYouTitle={{'en': 'Thank you!'}}
                                thankYouMessage={{'en': 'We\'ll get back to you very soon.'}}
                                thankYouOkButtonLabel={{'en': 'Ok'}}
                                locale='en' />
        </div>

        <div className="component">
          <p>Call To Action Component:</p>
          <CallToActionComponent icons={[projectIcon._id, teamIcon._id]}
                                 texts={[{'en': "Let's start talking about your project."},{'en': "Come join an amazing team."}]}
                                 button_labels={[{'en': "Contact"},{'en': "Career"}]}
                                 links={[{'en': '/styleguide#button_clicked'},{'en': '/styleguide#button_clicked'}]}
                                 locale='en' />
        </div>

        <div className="component">
          <p>Only one Call To Action Component:</p>
          <CallToActionComponent icons={[projectIcon._id]}
                                 texts={[{'en': "Let's start talking about your project."}]}
                                 button_labels={[{'en': "Contact"}]}
                                 links={[{'en': '/styleguide#button_clicked'}]}
                                 locale='en' />
        </div>


        <div className="component">
          <p>Vertical Image List Component:</p>
          <VerticalImageListComponent images1={[rocketfuel._id, bcg._id, bcg._id, rocketfuel._id, rocketfuel._id, bcg._id]}
                                      images2={[rocketfuel._id, bcg._id, bcg._id, rocketfuel._id, rocketfuel._id, bcg._id]}
                                      images3={[rocketfuel._id, bcg._id, bcg._id, rocketfuel._id, rocketfuel._id, bcg._id]}
                                      title1={{'en': "AGENCY"}}
                                      title2={{'en': "CORPORATE"}}
                                      title3={{'en': "STARTUP & NGOS"}}
                                      locale='en' />
        </div>

        <div className="component">
          <p>Two Column Component:</p>
          <TwoColumnsComponent title1={{'en': "Key Features"}}
                               title2={{'en': "Services"}}
                               iconTitle2={{'en': "Technologies"}}
                               icons1={[ ]}
                               icons2={[swiftLogo._id, railsLogo._id]}
                               points1={[{'en': "AQI reading from the US consulate"}, {'en': "Air description"}, {'en': "Weather forecast: current and next 3 days"}, {'en': "Daily advice based on weather, air, city, date, time"}, {'en': "Celsius and Farenheit"}, {'en': "App icon badge displays AQI for current city so user doesn’t have to open tapp"}, {'en': "Social network sharing"}, {'en': "New widget for notification center"}, {'en': "Upcoming feature: Photo sharing"}]}
                                points2={[{'en': "Product Definition"}, {'en': "User Experience Design"}, {'en': "Web Development"}, {'en': "Server Infrastructure"}, {'en': "On-Site Support"}]}
                               locale='en' />
        </div>

        <div className="component">
          <p>Testimonials Component:</p>
          <TestimonialsComponent title={{'en': "Testimonials"}}
                                 texts={[{'en': "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”"},{'en': "“Econsectetur adipiscing elit, sed do eiusmod tempo!”"}]}
                                 names={[{'en': "John Smith, CEO of Loripsum"}, {'en': 'Jane Aldrich, CEO of Loripsum'}]}
                                  locale='en' />

        </div>

        <div className="component">
          <p>Paper Content Component:</p>
          <PaperContentComponent title={{'en': "Our Technologies"}}
                                 text={{'en': "While we delight in experimenting with latest technologies, more often than not you’ll find us working with Ruby on Rails, Swift (iOS), Java (Android), HTML5 and CSS3 to find elegant solutions to complex problems. We’re experts in server infrastructure, database development, cloud architecture and speed optimization taking into account business, budget and legal constraints especially within China but also across Asia and the rest of the world."}}
                                 icons={[swiftLogo._id, railsLogo._id, swiftLogo._id, railsLogo._id]}
                                 locale='en' />
        </div>

        <div className="component">
          <p>Office Card Component:</p>
          <TextComponent title={{'en': 'Visit Us'}} text={{'en': 'Our doors are always open. Come to one of our offices to grab a cup of coffee and meet the Ekohe team.'}} locale='en' />
          <OfficeCardComponent title={{'en': "Shanghai"}}
                            button_label={{'en': 'VIEW'}}
                            url={{'en': '/offices/shanghai'}}
                            image={bannerImage._id}
                            address={{'en': "3010-1701 West Beijing Rd, Jing’an Temple District, Shanghai China 200040"}}
                            local_address={{'en': '上海市静安区北京西路1701号静安中華大厦3010室'}}
                            phone_number='+86 21 6288 2886'
                            locale='en' />
          <OfficeCardComponent title={{'en': "Tokyo"}}
                            button_label={{'en': 'VIEW'}}
                            url={{'en': '/offices/tokyo'}}
                            image={ImageCover._id}
                            address={{'en': "Aoyama Ezaki Building 3F, 1-1-16 Shibuya, Shibuya-ku, Tokyo, Japan 150-0002"}}
                            local_address={{'en': '〒150-0002東京都渋谷区渋谷1丁目1-16青山江崎ビル3F'}}
                            phone_number='+81 3 6892 4072'
                            locale='en' />

        </div>

        <div className="component">
          <p>Offices Cards Component</p>
          <OfficesCardsComponent button_label={{'en': 'VIEW'}} locale='en'/>
        </div>

        <div className="component">
          <p>Job Card Component:</p>
          <TextComponent title={{'en': 'Our Opportunities'}} locale='en' />
          <JobCardComponent title={{'en': "iOS Developer"}}
                            button_label={{'en': 'VIEW'}}
                            url={{'en': '/styleguide'}}
                            image={bannerImage._id}
                            text={{'en': "We’re looking for an organized individual that can multi-task and loves to see the growth of a project from concept creation to app launch and beyond."}}
                            locale='en' />
          <JobCardComponent title={{'en': "Production Designer"}}
                            button_label={{'en': 'VIEW'}}
                            url={{'en': '/styleguide'}}
                            image={ImageCover._id}
                            text={{'en': "We’re looking for an organized individual that can multi-task and loves to see the growth of a project from concept creation to app launch and beyond."}}
                            locale='en' />

        </div>

        <div className="component">
          <p>6 Icons Set Component:</p>
          <IconsSetComponent titles={[{'en': 'PAID LUNCH'},{'en': 'AWESOME PARTIES'},{'en': 'FLEXIBLE WORK HOURS'},{'en': 'COMPETITIVE REWARD'},{'en': 'STRONG TEAM SPIRIT'},{'en': 'BE HEARD'}]}
                             icons={[paidLunch._id, awesomeParty._id, paidLunch._id, awesomeParty._id, paidLunch._id, awesomeParty._id]}
                             locale='en' />
        </div>

        <div className="component">
          <p>4 Icons Set Component:</p>
          <IconsSetComponent titles={[{'en': 'TEAM MEMBERS'},{'en': 'PRODUCT LAUNCHES'},{'en': 'APP DOWNLOADS'},{'en': 'ACTIVE PROJECTS'}]}
                             icons={[teamMembers._id, productLaunches._id, appDownloads._id, activeProjects._id]}
                             locale='en' />
        </div>

        <div className="component">
          <p>Filmstrip Gallery Component:</p>
          <FilmstripGalleryComponent images={[culture01._id, culture02._id, culture03._id, culture04._id, culture05._id, culture01._id, culture02._id, culture03._id, culture04._id, culture05._id]} locale='en' />
        </div>

        <div className="component">
          <p>Text Image Side By Side Component (image on the right):</p>
          <TextImageSideBySideComponent title={{'en': 'PLAN'}}
                                        subtitle={{'en': 'We begin with a deep analysis of your market, identifying true product uniqueness and architect solutions that not only maximize your chances for receiving funding but disrupt your industry. '}}
                                        text={{'en': 'This approach has worked time and time again to produce successful, market ready products that users adore.'}}
                                        image={develop._id}
                                        imageToTheRightPosition={false}
                                        locale='en' />
        </div>

        <div className="component">
          <p>Offices Grid Component:</p>
          <OfficesGridComponent locale='en'/>
        </div>

        <div className="component">
          <p>Projects Grid Component:</p>
          <ProjectsGridComponent featured_only={false} locale='en'/>
        </div>

        <div className="component">
          <p>Office Map Component:</p>
          <OfficeMapComponent latitude={'31.22553'}
                              longitude={'121.44391'}
                              button_label={{'en': 'Google Map'}}
                              url='http://www.google.cn/maps/place/%E9%9D%99%E5%AE%89%E4%B8%AD%E5%8D%8E%E5%A4%A7%E5%8E%A6/@31.225977,121.444641,19z/data=!4m5!3m4!1s0x35b26ffd9478e37f:0x3c88eeb32a47d0d6!8m2!3d31.2254592!4d121.4442682?hl=zh-CN'
                              locale='en' />
        </div>

        <div className="component">
          <p>Job Application Component:</p>
          <TextComponent title={{'en': 'Want to work for us?'}} text={{'en': 'Fill out the form or email us at jobs@ekohe.com.'}} locale='en' />


          <JobApplicationComponent
            nameLabel={{'en': 'Your Name'}}
            emailLabel={{'en': 'Email'}}
            subjectLabel={{'en': 'Subject'}}
            messageLabel={{'en': 'Message'}}
            sendButtonLabel={{'en': 'Send'}}
            uploadButtonLabel={{'en': 'Upload File'}}
            fileTypeError={{'en': 'Sorry, we do not accept this kind of files.'}}
            emailMissingErrorMessage={{'en': 'Email address is required'}}
            emailInvalidErrorMessage={{'en': 'Email address is invalid'}}
            thankYouTitle={{'en': 'Thank you!'}}
            thankYouMessage={{'en': 'We\'ll get back to you very soon.'}}
            thankYouOkButtonLabel={{'en': 'Ok'}}
            jobId={job._id}
            locale='en' />
        </div>

        <div className="component">
          <p>Banner Image Component with a logo and links:</p>
          <BannerImageComponent
              image={bannerImage._id}
              logo={airpocalypseLogo._id}
              links_icons={['phone', 'computer']}
              links_titles={[{'en': "APP STORE"}, {'en': "WEBSITE"}]}
              links_urls={[{'en': "https://itunes.apple.com/us/app/airpocalypse/id808583519?mt=8"}, {'en': 'http://www.airpocalypseapp.com/'}]}
              locale='en'/>
        </div>

        <div className="component">
          <p>Team Component</p>
          <TeamComponent locale='en'/>
        </div>

      </div>
    )
  }
}

export default StyleGuideContainer = createContainer(() => {
  const images = Meteor.subscribe('images');

  return {
    subscriptionReady: images.ready(),
    images: Images.find({}).fetch() || []
  };
}, StyleGuide);
