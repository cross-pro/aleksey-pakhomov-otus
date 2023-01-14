
const getLangSettings = () :string => {
  let langTo = localStorage.getItem("langTo")
  let nativeLang = localStorage.getItem("nativeLang")

  if (langTo===null) langTo="en"
  if (nativeLang===null) nativeLang ="ru"

  return getLangCode(nativeLang)+"|"+getLangCode(langTo)
}

const getLangCode = (lang: string) : string => {
  switch(lang) {
    case("Русский"):
      return "ru"
    case ("Английский"):
      return "en"
    default:
      return "en"
  }

}

export {getLangSettings}
