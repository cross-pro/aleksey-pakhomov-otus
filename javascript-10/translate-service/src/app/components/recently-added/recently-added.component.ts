import {Component, OnInit} from '@angular/core';
import IDictionary from "../../models/dictionary";
import {TranslateService} from "../../services/translate/translate.service";
import {StoreService} from "../../services/store/store.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  constructor(private translateService: TranslateService,
              private storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("en|ru") == null)
      localStorage.setItem("en|ru", JSON.stringify(this.dictionary))

    this.store$ = this.storeService.getAllWords("en|ru").pipe(
      tap(()=> console.log("loading completed"))
    );
  }

  store$: Observable<IDictionary[]>

  dictionary: IDictionary[] = [{
    word: "Hello",
    translatedWord: "Привет"
  }, {
    word: "Bye",
    translatedWord: "Пока"
  }, {
    word: "Whats` up",
    translatedWord: "Че кого"
  }, {
    word: "Call me ",
    translatedWord: "Перезвони мне"
  },
    {
      word: "See you. later",
      translatedWord: "Увидимся позже"
    }

  ]
}
