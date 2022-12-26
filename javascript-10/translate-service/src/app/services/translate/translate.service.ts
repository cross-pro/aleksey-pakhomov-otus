import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay, retry} from "rxjs/operators";
import {getLangSettings} from "../../util/lang-util";
import TranslateResponse from "../../models/translate-response";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http : HttpClient) { }

  translate(word: string) : Observable<TranslateResponse> {
    let langpair = getLangSettings()
    console.log(langpair)
    return this.http.get<TranslateResponse>("https://api.mymemory.translated.net/get", {
      params: new HttpParams().append("langpair",langpair).append("q",word)
    }).pipe(
      delay(100),
      retry(2)
    )
  }
}
