import {Component, OnInit} from '@angular/core';
import IDictionary from "../../models/dictionary";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

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
