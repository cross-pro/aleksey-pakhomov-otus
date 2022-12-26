import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import IDictionary from "../../models/dictionary";
import {catchError} from "rxjs/operators";
import {ErrorService} from "../error/error.service";
import {addWord} from "../../util/word-util";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private errorService: ErrorService) {
  }

  readStore(key: string): Observable<IDictionary[]> | never {
    try {
      let storage = localStorage.getItem(key)

      let storeDB
      if (storage != null) {
        storeDB = JSON.parse(storage)
      }
      return of(storeDB)
    } catch (e) {
      return throwError(e)
    }
  }


  getAllWords(key: string): Observable<IDictionary[]> {
    return this.readStore(key)
      .pipe(
        catchError(this.errorHandler.bind(this)))
  }

  errorHandler(error: any) {
    this.errorService.handle(error.toString())
    return throwError(error)
  }

  addWord = (word:string, translated: string) => {
    addWord(word, translated);
  }

}
