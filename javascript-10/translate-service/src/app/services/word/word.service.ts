import {Injectable} from '@angular/core';
import {ErrorService} from "../error/error.service";
import {TranslateService} from "../translate/translate.service";
import TranslateResponse from "../../models/translate-response";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {addWord} from "../../util/word-util";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private errorService: ErrorService,
              private translateService: TranslateService) {
  }

  saveWord(word: string) {
    this.translateService.translate(word).pipe(
      catchError(this.errorHandler.bind(this)))
      .subscribe((data: TranslateResponse) => {
        console.log(data.responseStatus)
        let translated = data.responseData.translatedText
        /*согласно API стороннего ресурса, если перевод не найдет, то возвращается
       * то же самое слово*/
        if (translated === word || data.responseStatus != "200") {
          this.errorHandler("Статус ответа: " + data.responseStatus + " Текст ответа: " + translated)
        } else {
          console.log("перевод:", translated)
          addWord(word, translated)
        }
      })
  }

  errorHandler(error: any) {
    this.errorService.handle(error.toString())
    return throwError(error)
  }
}
