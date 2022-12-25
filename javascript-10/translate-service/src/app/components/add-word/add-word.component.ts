import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {

  constructor(private el: ElementRef) { }

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


    this.word=""

    /*смотрится красиво, но чет не срабатывает xD*/
    this.el.nativeElement.focus();
  }


}
