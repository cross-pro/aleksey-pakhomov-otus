import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  info$ = new Subject<string>()

  handle(message: string) {
    this.info$.next(message)
    //через 2с закрывать
    setTimeout(()=>this.clear(),1000)
  }

  clear() {
    this.info$.next("")
  }


}
