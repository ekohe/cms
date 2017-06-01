import Offices from '../../collections/offices'
import { Images } from '../../collections'

export default loadOfficesFixtures = () => {
  if (Offices.find().count() > 0) { return }

  console.log("Loading default offices...");

  Offices.insert({
    slug: 'shanghai',
    city: {
      en: "Shanghai",
      fr: "Shanghai",
      cn: "上海",
      jp: "上海"
    },
    subtitle: {
      en: 'Since 2007, Shanghai is where we jump started the journey.',
      fr: 'Depuis 2007, Shanghai est la ville où tout a commencé pour Ekohe.',
      cn: '自2007年起，上海便是我们旅程开始的地方',
      jp: '2007年に私たちが勢い良く旅のスタートをきった場所、それが上海です。'
    },
    small_picture: Images.find({path: '/df0d/shanghai_small.jpg'}).fetch()[0]._id
  });

  Offices.insert({
    slug: 'tokyo',
    city: {
      en: "Tokyo",
      fr: "Tokyo",
      cn: "东京",
      jp: "東京"
    },
    subtitle: {
      en: 'Tokyo is where high technology and old tradition thrive together, where business and entertainment interweave with cultural expressions.',
      fr: 'Ville de tous les contrastes,Tokyo a su accueillir le modernisme tout en conservant ses traditions culturelles.',
      cn: '东京是一座新兴科技与传统文化共同发展，商业和娱乐相互交织，多元文化并存的城市。',
      jp: '先端技術と古くからの伝統、ビジネスとエンターテインメントが交錯する東京には、多様な文化が共存しています。'
    },
    small_picture: Images.find({path: '/f3e2/tokyo_small.jpg'}).fetch()[0]._id
  });

  Offices.insert({
    slug: 'paris',
    city: {
      en: "Paris",
      fr: "Paris",
      cn: "巴黎",
      jp: "パリ"
    },
    subtitle: {
      en: 'Elegant and cosmopolitan, Paris is known as the "City of Lights".',
      fr: 'Symbole de la culture Française, Paris est surnommé "la ville lumière".',
      cn: '优雅和国际化的巴黎被称为城市之光。',
      jp: '優雅で洗練された街パリは「光の都」として知られています。'
    },
    small_picture: Images.find({path: '/6de3/paris_small.jpg'}).fetch()[0]._id
  });

  Offices.insert({
    slug: 'vancouver',
    city: {
      en: "Vancouver",
      fr: "Vancouver",
      cn: "溫哥華",
      jp: "バンクーバー"
    },
    subtitle: {
      en: 'Consistently named one of the top 5 best cities in the world, Vancouver is lively, fresh and definitely a natural beauty.',
      fr: 'Vancouver fait partie des 5 villes les plus agréables au monde, parfait mélange entre nature et urbanisme, Vancouver est dynamique, cosmopolite et offre une qualité de vie exceptionnelle.',
      cn: '一直被誉为全球最美的5座城市之一的温哥华，是一座风景如画，活力四射的城市。',
      jp: '世界の最も良い都市ランキングのトップ5に常に名前が挙がるバンクーバーは、活気があり素晴らしく、まごうことなく自然が美しい街です。'
    },
    banner: Images.find({path: '/0878/vancouver.jpg'}).fetch()[0]._id,
    small_picture: Images.find({path: '/99d0/vancouver_small.jpg'}).fetch()[0]._id
  });
}
