import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http : HttpClient) { }

  getAll() : Observable<any[]> {
    return this.http.get<any[]>("https://fakestoreapi.com/products", {
      params: new HttpParams().append("limit","3")
    }).pipe(
      delay(1000)
    )
  }
}
