import {Injectable} from '@angular/core';
import {ErrorService} from "../error/error.service";
import {TranslateService} from "../translate/translate.service";
import TranslateResponse from "../../models/translate-response";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {StoreService} from "../store/store.service";
import {MessageService} from "../message/message.service";

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private errorService: ErrorService,
              private translateService: TranslateService,
              private storeService: StoreService,
              private messageService: MessageService) {
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
          this.storeService.addWord(word, translated)

          /*здесь обновляется список слов на главной страницы при добавлении слова
          * своего рода триггер
          * если неверно, пожалуйста поправьте*/
          this.messageService.handle("update")
        }
      })
  }

  errorHandler(error: any) {
    this.errorService.handle(error.toString())
    return throwError(error)
  }
}
