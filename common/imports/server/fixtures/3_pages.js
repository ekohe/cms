import { Pages } from '../../collections'

export default loadPagesFixtures = () => {
  if (Pages.find({slug: ''}).fetch()[0]==null) {
    console.log("Loading homepage...");

    Pages.insert({
      title: {
        en: 'Ekohe',
        fr: 'Ekohe',
        cn: '易空海',
        jp: 'イコヒー'
      },
      slug: '',
      type: 'static',
      status: 'published',
      components: [
        {
         _id: Meteor.uuid(),
         position: 0,
         type: 'TextComponent',
         props: {
           title: {
             en: 'Featured Work',
             fr: 'Nos projets',
             cn: '工作特色',
             jp: '注目の事例'
           },
           subtitle: {
             en: 'A taste of some of the ideas we’ve brought to life.',
             fr: 'Une sélection de nos plus belles réussites.',
             cn: '我们为生活带来活色生香的想法',
             jp: '私たちが生活にもたらした、いくつかのアイデアの一端'
           }
         }
       },
       {
        _id: Meteor.uuid(),
        position: 1,
        type: 'OfficesGridComponent',
        props: {}
       },
       {
        _id: Meteor.uuid(),
        position: 2,
        type: 'TextComponent',
        props: {
          title: {
            en: 'What We Do',
            fr: 'Nos Solutions',
            cn: '我们做什么',
            jp: '何をしているか'
          },
          subtitle: {
            en: 'We have over 10 years experience of taking initial ideas and turning them into successful digital products.',
            fr: 'Nous sommes une agence digitale internationale avec plus de 10 ans d\'expérience dans l\'élaboration et le développement de projets complexes.',
            cn: '我们拥有将无限想法创造为成功数字产品10多年的经验。',
            jp: '私たちには、初期のアイデアをもって上出来なデジタル製品に変えるという経験が10年以上あります。'
          }
        }
       }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'about'}).fetch()[0]==null) {
    console.log("Loading about page...");
    Pages.insert({
      title: {
        en: 'About Ekohe',
        fr: 'Qui sommes-nous ?',
        cn: '关于易空海',
        jp: 'Ekohe について'
      },
      slug: 'about',
      type: 'static',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'solutions'}).fetch()[0]==null) {
    console.log("Loading solutions page...");
    Pages.insert({
      title: {
        en: 'Solutions',
        fr: 'Solutions',
        cn: '咨询方案',
        jp: 'ソリューション'
      },
      slug: 'solutions',
      type: 'static',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'work'}).fetch()[0]==null) {
    console.log("Loading work page...");
    Pages.insert({
      title: {
        en: 'Featured Work',
        fr: 'Nos Projets',
        cn: '工作特色',
        jp: '注目の事例'
      },
      slug: 'work',
      type: 'static',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'career'}).fetch()[0]==null) {
    console.log("Loading career page...");
    Pages.insert({
      title: {
        en: 'Come grow with us.',
        fr: 'Venez grandir avec nous.',
        cn: '和我们一起成长',
        jp: '私たちと一緒に成長しましょう'
      },
      slug: 'career',
      type: 'static',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'contact'}).fetch()[0]==null) {
    console.log("Loading contact page...");
    Pages.insert({
      title: {
        en: 'Hello. 你好. こんにちは. Bonjour.',
        fr: 'Hello. 你好. こんにちは. Bonjour.',
        cn: 'Hello. 你好. こんにちは. Bonjour.',
        jp: 'Hello. 你好. こんにちは. Bonjour.'
      },
      slug: 'contact',
      type: 'static',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'offices/:slug'}).fetch()[0]==null) {
    console.log("Loading offices page...");
    Pages.insert({
      title: {
        en: '{city.en}',
        fr: '{city.fr}',
        cn: '{city.cn}',
        jp: '{city.jp}'
      },
      slug: 'offices/:slug',
      components: [
        {
         _id: Meteor.uuid(),
         position: 0,
         type: 'BannerImageComponent',
         props: {
           image: '{banner}',
           title: {
             en: '{subtitle.en}',
             fr: '{subtitle.fr}',
             cn: '{subtitle.cn}',
             jp: '{subtitle.jp}'
           }
         }
       },
       {
        _id: Meteor.uuid(),
        position: 1,
        type: 'OfficesGridComponent',
        props: {}
       }
      ],
      type: 'element',
      collection: 'Offices',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'projects/:slug'}).fetch()[0]==null) {
    console.log("Loading projects page...");
    Pages.insert({
      title: {
        en: '{name.en}',
        fr: '{name.fr}',
        cn: '{name.cn}',
        jp: '{name.jp}'
      },
      slug: 'projects/:slug',
      components: [
        {
         _id: Meteor.uuid(),
         position: 0,
         type: 'TextComponent',
         props: {
           title: {
             en: '{name.en}',
             fr: '{name.fr}',
             cn: '{name.cn}',
             jp: '{name.jp}'
           },
           subtitle: {}
         }
       }
      ],
      type: 'element',
      collection: 'Projects',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  if (Pages.find({slug: 'jobs/:slug'}).fetch()[0]==null) {
    console.log("Loading jobs page...");
    Pages.insert({
      title: {
        en: '{position.en}',
        fr: '{position.fr}',
        cn: '{position.cn}',
        jp: '{position.jp}'
      },
      slug: 'jobs/:slug',
      components: [
        {
         _id: Meteor.uuid(),
         position: 0,
         type: 'TextComponent',
         props: {
           title: {
             en: '{position.en}',
             fr: '{position.fr}',
             cn: '{position.cn}',
             jp: '{position.jp}'
           },
           subtitle: {}
         }
       }
      ],
      type: 'element',
      collection: 'Jobs',
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
