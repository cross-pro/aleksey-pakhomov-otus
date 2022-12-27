import {Component, OnInit} from '@angular/core';
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

  constructor(private errorService: ErrorService,
              private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.wordDb = getDictionary()
    this.nextWord()
    this.setTime()
    this.setExercizeCount()
  }

  wordDb: Array<IDictionary>
  started = false;
  result = 0
  error = 0
  time = 300
  completed = false
  wordRepeated: Array<IDictionary> = []
  word = ""
  translatedWord = ""
  current: IDictionary
  counter: any
  win = false
  exercizeCount = 10

  form = new FormGroup({
    word: new FormControl<string>(this.word),
    translatedWord: new FormControl<string>(this.translatedWord, [
      Validators.required
    ]),
  })

  setTime = () => {
    let time = localStorage.getItem("timeToGo")
    if (time != null) this.time = parseInt(time)
  }

  setExercizeCount = () => {
    let count = localStorage.getItem("wordCount")
    if (count != null) this.exercizeCount = parseInt(count)
  }

  start = () => {
    if (this.wordDb.length === 0) {
      this.errorService.handle("Необходимо заполнить слова для изучения")
      return
    }

    this.started = true

    this.counter = interval(1000).pipe(
      take(this.time)
    ).subscribe(() => {
      this.time--
      if (this.time === 0) {
        this.errorService.handle("Вы не успели, попробуйте еще")
        this.counter.unsubscribe()
      }
    }, null, () => {
      this.completed = true
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
      this.wordRepeated.push(this.current)
    }

    this.translatedWord = ""
    if (this.exercizeCount === this.result) {
      this.win = true;
      this.completed = true
      this.counter.unsubscribe()
    }
    this.nextWord()
  }

  nextWord = () => {
    this.current = this.wordDb[this.getRandomInt(this.wordDb.length)]
    this.word = this.current.word
    return this.current;
  }

  submit = () => {
    let data: IDictionary = this.form.value as IDictionary
    this.checkAnswer(data.word, data.translatedWord)
  }

  getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  }

}
