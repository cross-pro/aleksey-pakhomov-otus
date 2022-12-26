/*утилита для работы со словарем*/

import {getLangSettings} from "./lang-util";
import IDictionary from "../models/dictionary";

const getOrInitStorage = (): string => {
  let lang = getLangSettings();
  if (lang == null) {
    localStorage.setItem(lang, "[]")
    return "[]"
  }
  let storage = localStorage.getItem(lang)
  if (storage == null) return "[]"
  else return storage;
}

const buildWordDict = (word: string, translated: string) : IDictionary => {
  return {
    "word": word,
    "translatedWord": translated
  }
}

const addWord = (word: string, translate: string): void => {
  let storage = JSON.parse(getOrInitStorage())

  let row = buildWordDict(word, translate)
  storage.push(row)
  localStorage.setItem(getLangSettings(), JSON.stringify(storage))
}

const getReverseStorage = () : IDictionary[] => {
    let storage = localStorage.getItem(getLangSettings())

    let storeDB
    if (storage != null) {
      storeDB = JSON.parse(storage)
    }
    return storeDB.reverse().splice(0,10)
}

export {addWord, getReverseStorage}
