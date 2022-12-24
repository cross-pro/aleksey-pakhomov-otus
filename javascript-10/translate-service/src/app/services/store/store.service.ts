import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import IDictionary from "../../models/dictionary";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {
  }

  getAllWords(key: string): Observable<IDictionary[]> {
    let storage = localStorage.getItem(key)

    let storeDB
    if (storage != null) {
      storeDB = JSON.parse(storage)
      console.log(storeDB)
    }

    return of(storeDB)
  }
}
