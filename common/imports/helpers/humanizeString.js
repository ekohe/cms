export default function humanizeString(string) {
  if (string==null) { return null }
  return string.replace(/([A-Z]+)/g, " $1").
                replace(/([A-Z][a-z])/g, " $1").
                replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).
                replace(/^(\s)+/, '').
                replace(/_/g, " ");
}
