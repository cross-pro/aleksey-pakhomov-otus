import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-choose-language',
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.css']
})
export class ChooseLanguageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.loadData()
  }

  wordCount = "10"
  timeToGo = "300"
  nativeLang = "Русский"
  langTo = "Английский"

  form = new FormGroup({
    words: new FormControl<string>(this.wordCount),
    time: new FormControl<string>(this.timeToGo),
    nativeLang: new FormControl<string>(this.readProperty("nativeLang")),
    langTo: new FormControl<string>("")
  })

  loadData = () => {
    this.wordCount = this.setValue("wordCount", "10")
    this.timeToGo = this.setValue("timeToGo", "300")
    this.nativeLang = this.setValue("nativeLang", "Русский")
    this.langTo = this.setValue("langTo", "Английский")
  }

  readProperty(name: string): string {
    if (!name) return ""
    let value = localStorage.getItem("name")
    if (value !== null)
      return value;
    else
      return ""
  }

  setValue(name: string, value: string): string {
    if (this.readProperty(name)) return this.readProperty(name)
    return value;
  }

  saveData = () => {

  }


  submit = () => {
    console.log(this.form.value);
  }

}
