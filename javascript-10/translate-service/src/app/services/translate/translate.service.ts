import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http : HttpClient) { }

  getAll() : Observable<any[]> {
    return this.http.get<any[]>("https://api.mymemory.translated.net/get", {
      params: new HttpParams().append("langpair","en|ru").append("q","hello")

    }).pipe(
      delay(1000),
      retry(2)
    )
  }
}
