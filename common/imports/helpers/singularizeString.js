export default function singularizeString(string) {
  if (string==null) { return null }
  return string.replace(/s$/, "").
                replace(/ies$/, "y");
}
