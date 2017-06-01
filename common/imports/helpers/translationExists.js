export default function translationExists(string, locale) {
  if ((string!=null) &&
      (string[locale]!=null) &&
      (string[locale]!="")) {
    return string[locale]
  }
  return null
}
