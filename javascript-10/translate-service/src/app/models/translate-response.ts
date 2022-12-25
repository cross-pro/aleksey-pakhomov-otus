export default interface TranslateResponse {

  responseData: {
    translatedText: string,
    match: number
  },
  responseStatus: string

}
