import {Component, OnInit} from '@angular/core';
import {GoService} from "../../services/go/go.service";
import {ErrorService} from "../../services/error/error.service";
import {InfoService} from "../../services/info/info.service";
import {readWord} from "../../util/word-util";
import {interval} from "rxjs";
import {take} from "rxjs/operators";

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
  }

  started = false;
  result = 0
  error = 0
  time = 10
  completed = false

  start = () => {
    this.started = true

    interval(1000).pipe(
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
  answer = (word: string, translate: string) => {
    let lib = readWord(word)
    if (lib == null) {
      this.infoService.handle("Слово не найдено, добавлю 5 секунд в качестве компенсации")
      this.time = this.time + 5

    } else if (lib.word.toLowerCase() === translate.toLowerCase()) {
      this.infoService.handle("Верный ответ")
      this.result++
    } else {
      this.errorService.handle("Ошибка перевода")
      this.error++
    }

    this.nextWord()
  }

  nextWord = () => {

  }

}
