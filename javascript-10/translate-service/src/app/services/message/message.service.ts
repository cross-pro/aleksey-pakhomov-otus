import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  message$ = new Subject<string>()

  handle(message: string) {
    this.message$.next(message)
  }

}
