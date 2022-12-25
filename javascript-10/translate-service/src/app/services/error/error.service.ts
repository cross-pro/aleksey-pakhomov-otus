import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error$ = new Subject<string>()

  handle(message: string) {
    this.error$.next(message)
    //через 5с закрывать
    setTimeout(()=>this.clear(),5000)
  }

  clear() {
    this.error$.next("")
  }

}
