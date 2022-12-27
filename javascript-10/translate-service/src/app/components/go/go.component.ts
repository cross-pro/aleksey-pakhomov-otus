import {Component, OnInit} from '@angular/core';
import {GoService} from "../../services/go/go.service";
import {ErrorService} from "../../services/error/error.service";
import {InfoService} from "../../services/info/info.service";
import {interval, Observable} from "rxjs";
import {take} from "rxjs/operators";
import IDictionary from "../../models/dictionary";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getDictionary} from "../../util/word-util";

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  constructor(private goService: GoService,
              private errorService: ErrorService,
              private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.wordDb = getDictionary();
    this.nextWord();
  }

  wordDb : Array<IDictionary>
  started = false;
  result = 0
  error = 0
  time = 300
  completed = false
  wordRepeated : Array<IDictionary> = []
  word = ""
  translatedWord = ""
  current: IDictionary
  counter: any

  form = new FormGroup({
    word: new FormControl<string>(this.word),
    translatedWord: new FormControl<string>(this.translatedWord, [
      Validators.required
    ]),
  })

  start = () => {
    this.started = true

    this.counter = interval(1000).pipe(
      take(this.time)
    ).subscribe(()=>{
      this.time--
      if (this.time === 0) {
        this.errorService.handle("Вы не успели, попробуйте еще")
      }
    }, null, ()=> {
      this.completed=true
    })
  }

  /*проверяет ответ*/
  checkAnswer = (word: string, translate: string) => {
    if (this.current.translatedWord.toLowerCase() === translate.toLowerCase()) {
      this.infoService.handle("Верный ответ")
      this.result++
    } else {
      this.infoService.handle("Ошибка перевода, будьте внимательнее")
      this.error++
    }

    this.translatedWord = ""
    this.nextWord()
  }

  nextWord = () => {
    this.current =  this.wordDb[this.getRandomInt(this.wordDb.length)]
    this.word = this.current.word
    return this.current;
  }

  submit = () => {
    let data : IDictionary = this.form.value as IDictionary
    this.checkAnswer(data.word, data.translatedWord)
  }

  getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  }

}
