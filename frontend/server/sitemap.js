import { Localizations, MenuEntries, Pages, Images } from '/common/imports/collections';
import * as collections from '/common/imports/collections/index'

Meteor.generateSitemap = () => {
  const defaultLocalization = Localizations.find({default: true}).fetch()[0]
  const nonDefaultLocalizations = Localizations.find({default: {$ne:true}}).fetch()
  const pages = Pages.find({}).fetch()
  const pagesButTheHomepage = Pages.find({slug: {$ne: ''}}).fetch()
  const members = TeamMembers.find({published: true}, {sort: {rank: 1}}).fetch()

  var urls = []
  // Homepage
  urls.push('')

  // English pages
  pagesButTheHomepage.map((page) => {
    if (page.slug.includes(':slug')) {
      // dynamic page
      if (page.type == 'element') {
        let collection = null
        if (((page.type=='element') || (page.type=='collection')) && (page.collection!=null)) {
          collection = eval("collections."+page.collection)
        }

        collection.find({}).fetch().map((element) => {
          urls.push(page.slug.replace(":slug", element.slug))
        })
      } else {
        console.log("don't know what to do")
      }
    } else {
      // static page
      urls.push(page.slug)
    }
  })
  // Each member english page
  members.map((member) => { urls.push(member.slug) })

  nonDefaultLocalizations.map((localization) => {
    // Localized homepage
    urls.push(localization.locale)

    // Pages
    pagesButTheHomepage.map((page) => {
      if (page.slug.includes(':slug')) {
        // dynamic page
        if (page.type == 'element') {
          let collection = null
          if (((page.type=='element') || (page.type=='collection')) && (page.collection!=null)) {
            collection = eval("collections."+page.collection)
          }

          collection.find({}).fetch().map((element) => {
            urls.push(localization.locale + '/' + page.slug.replace(":slug", element.slug))
          })
        } else {
          console.log("don't know what to do")
        }
      } else {
        // static page
        urls.push(localization.locale + '/' + page.slug)
      }
    })

    // Each member localized page
    members.map((member) => { urls.push(localization.locale + '/' + member.slug) })
  })

  var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
  xml += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
  //console.log("Total of "+urls.length+" urls")
  for (var i=0; i<urls.length; i++) {
    xml += "<url>\n";
    xml += "<loc>https://ekohe.com/"+escapeURI(urls[i])+"</loc>\n";
    xml += "</url>\n";
  }
  xml += "</urlset>\n";
  return xml;
}

function escapeURI(uri) {
  return encodeURI(uri).replace("&", "&amp;").replace("'", "&apos;").replace("\"", "&quot;").replace(">", "&gt;").replace("<", "&lt;")
}
