import { Localizations } from '/common/imports/collections';

export const extractLocaleFromPath = (pathName) => {
  const defaultLocale = Localizations.find({default: true}).fetch()[0].locale
  if (pathName[0]=="/") {
    pathName = pathName.slice(1)
  }
  const pathComponents = pathName.split('/');

  if (pathComponents.length == 0) {
    return defaultLocale
  }

  let localization = Localizations.find({locale: pathComponents[0]}).fetch()[0]
  if (localization!=null) {
    return localization.locale
  }

  return defaultLocale
}

export const hasLocaleInRoute = (pathName) => {
  if (pathName[0]=="/") {
    pathName = pathName.slice(1)
  }
  const pathComponents = pathName.split('/');

  if (pathComponents.length == 0) { return false }

  let localization = Localizations.find({locale: pathComponents[0]}).fetch()[0]

  return (localization!=null)
}

export const rebuildRouteWithLocale = (pathName, locale) => {
  if (!pathName) {
    pathName = '/'
  }
  if (pathName[0]=="/") {
    pathName = pathName.slice(1)
  }
  const defaultLocale = Localizations.find({default: true}).fetch()[0].locale

  if (locale==defaultLocale) {
    if (hasLocaleInRoute(pathName)) {
      // Remove existing locale from route
      const localeFromPath = extractLocaleFromPath(pathName)
      const searchRegexp = new RegExp("^"+localeFromPath)
      const newRoute = pathName.replace(searchRegexp, '')
      if (newRoute=="") { return "/" } else { return newRoute }
    } else {
      // Don't do anything
      return "/"+pathName
    }
  } else {
    if (hasLocaleInRoute(pathName)) {
      // Change locale in path
      const localeFromPath = extractLocaleFromPath(pathName)
      const searchRegexp = new RegExp("^"+localeFromPath)
      const newRoute = "/" + pathName.replace(searchRegexp, locale)
      return newRoute
    } else {
      // Prefix new locale
      if (pathName.length > 0) {
        return "/" + locale + "/" + pathName
      } else {
        return "/" + locale
      }
    }
  }
}

export const areRoutesEqual = (route1, route2) => {
  // Make sure we compare the routes without the leading slash
  if (route1[0]=='/') {
    route1 = route1.slice(1)
  }
  if (route2[0]=='/') {
    route2 = route2.slice(1)
  }
  return (route1 == route2)
}
