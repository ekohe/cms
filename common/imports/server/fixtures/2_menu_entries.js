import { MenuEntries } from '../../collections'

export default loadMenuEntriesFixtures = () => {
  if (MenuEntries.find().count() > 0) { return }
  console.log("Loading default menu entries...");

  MenuEntries.insert({
    name: {
      en: 'About',
      fr: 'À Propos',
      cn: '关于我们',
      jp: '会社案内'
    },
    url: '/about',
    position: 0,
    children: [
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Team & Culture',
          fr: "Équipe et culture",
          cn: "团队文化",
          jp: 'チームと文化',
        },
        url: '/about',
        position: 0
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Shanghai',
          fr: "Shanghai",
          cn: "上海",
          jp: '上海',
        },
        url: '/offices/shanghai',
        position: 1
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Paris',
          fr: "Paris",
          cn: "巴黎",
          jp: 'パリ',
        },
        url: '/offices/paris',
        position: 2
      },

      {
        _id: Meteor.uuid(),
        name: {
          en: 'Tokyo',
          fr: "Tokyo",
          cn: "东京",
          jp: '東京',
        },
        url: '/offices/tokyo',
        position: 3
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Vancouver',
          fr: "Vancouver",
          cn: "温哥华",
          jp: 'バンクーバー',
        },
        url: '/offices/vancouver',
        position: 4
      }
    ],
    createdAt: new Date()
  });

  MenuEntries.insert({
    name: {
      en: 'Solutions',
      fr: 'Solutions',
      cn: '咨询方案',
      jp: 'ソリューション'
    },
    url: '/solutions',
    position: 1,
    children: [
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Process',
          fr: "Méthode",
          cn: "工作流程",
          jp: 'プロセス',
        },
        url: '/solutions#process',
        position: 0
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Technologies',
          fr: "Technologies",
          cn: "技术",
          jp: '技術',
        },
        url: '/solutions#technologies',
        position: 1
      }
    ],
    createdAt: new Date()
  });

  MenuEntries.insert({
    name: {
      en: 'Work',
      fr: 'Projets',
      cn: '工作',
      jp: '実績'
    },
    url: '/work',
    position: 2,
    children: [
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Case Studies',
          fr: "Projets",
          cn: "项目展示",
          jp: '事例紹介',
        },
        url: '/work#case_studies',
        position: 0
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Clients',
          fr: "Clients",
          cn: "客户",
          jp: 'クライアント',
        },
        url: '/work#clients',
        position: 1
      }
    ],
    createdAt: new Date()
  });

  MenuEntries.insert({
    name: {
      en: 'Career',
      fr: 'Carrières',
      cn: '职业发展',
      jp: 'キャリア'
    },
    url: '/career',
    position: 3,
    children: [
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Jr Designer',
          fr: "Jr Designer",
          cn: "Jr Designer",
          jp: 'Jr Designer',
        },
        url: '/jobs/Junior_Designer',
        position: 0
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'UI / UX Designer',
          fr: "UI / UX Designer",
          cn: "UI / UX Designer",
          jp: 'UI / UX Designer',
        },
        url: '/jobs/UI-UX_Designer',
        position: 1
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Business Developer',
          fr: "Business Developer",
          cn: "Business Developer",
          jp: 'Business Developer',
        },
        url: '/jobs/Business_Dev_&_Client_Management',
        position: 2
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Project Manager',
          fr: "Project Manager",
          cn: "Project Manager",
          jp: 'Project Manager',
        },
        url: '/jobs/project-manager',
        position: 3
      },
      {
        _id: Meteor.uuid(),
        name: {
          en: 'Front End Developer',
          fr: "Front End Developer",
          cn: "Front End Developer",
          jp: 'Front End Developer',
        },
        url: '/jobs/Front-End-Dev',
        position: 4
      }
    ],
    createdAt: new Date()
  });

  MenuEntries.insert({
    name: {
      en: 'Contact',
      fr: 'Contact',
      cn: '联系方式',
      jp: 'お問い合わせ'
    },
    url: '/contact',
    position: 4,
    children: [
      {
        _id: Meteor.uuid(),
        name: {
          en: 'info@ekohe.com',
          fr: "info@ekohe.com",
          cn: "info@ekohe.com",
          jp: 'info@ekohe.com',
        },
        url: 'mailto:info@ekohe.com',
        position: 0
      }
    ],
    createdAt: new Date()
  });

}
