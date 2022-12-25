import {Injectable} from '@angular/core';
import {ErrorService} from "../error/error.service";
import {TranslateService} from "../translate/translate.service";
import TranslateResponse from "../../models/translate-response";
import {throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

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
        let translated = data.responseData.translatedText
        /*согласно API стороннего ресурса, если перевод не найдет, то возвращается
        * то же самое слово*/
        if (translated === word) {
          this.errorHandler("Перевод найти не удалось")
        } else {
          console.log("перевод:", translated)
        }
      })
  }

  errorHandler(error: any) {
    this.errorService.handle(error.toString())
    return throwError(error)
  }
}
