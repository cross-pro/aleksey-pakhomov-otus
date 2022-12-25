import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WordService} from "../../services/word/word.service";
import IFormWord from "../../models/form-word";

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {

  constructor(private el: ElementRef,
              private wordService: WordService) { }

  ngOnInit(): void {

  }

  word = ""

  form = new FormGroup({
    word: new FormControl<string>(this.word, [
      Validators.required,
      Validators.minLength(1),
    ])
  })

  submit = () => {
    console.log(this.form.value)

    let data  = this.form.value as IFormWord


    this.save(data.word)
    this.word =""

    /*смотрится красиво, но чет не срабатывает xD*/
    this.el.nativeElement.focus();
  }

  save = (word: string) => {
    this.wordService.saveWord(word)
  }

}
