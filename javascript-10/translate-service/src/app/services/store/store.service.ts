import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import IDictionary from "../../models/dictionary";
import {catchError} from "rxjs/operators";
import {ErrorService} from "../error/error.service";
import {addWord, getReverseStorage} from "../../util/word-util";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private errorService: ErrorService) {
  }

  readStore(): Observable<IDictionary[]> | never {
    try {
      return of(getReverseStorage())
    } catch (e) {
      return throwError(e)
    }

  }


  getAllWords(): Observable<IDictionary[]> {
    return this.readStore()
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
