import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import IFormData from "../../models/form-data";

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
    words: new FormControl<string>(this.wordCount, [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern("^[0-9]*$"),
    ]),
    time: new FormControl<string>(this.timeToGo, [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[0-9]*$"),
    ]),
    nativeLang: new FormControl<string>(this.readProperty("nativeLang")),
    langTo: new FormControl<string>(this.readProperty("langTo"))
  })

  loadData = () => {
    this.wordCount = this.setValue("wordCount", "10")
    this.timeToGo = this.setValue("timeToGo", "300")
    this.nativeLang = this.setValue("nativeLang", "Русский")
    this.langTo = this.setValue("langTo", "Английский")
  }

  readProperty(name: string): string {
    if (!name) return ""
    let value = localStorage.getItem(name)
    if (value !== null)
      return value;
    else
      return ""
  }

  setValue(name: string, value: string): string {
    if (this.readProperty(name)) {
      return this.readProperty(name)
    }
    return value;
  }

  saveToStorage(name: string, value: string) {
    localStorage.setItem(name, value)
  }

  saveData = (data: IFormData) => {
    if (Number.isNaN(parseInt(data.words)) || Number.isNaN(parseInt(data.time))) throw new Error("data invalid")
    this.saveToStorage("wordCount", data.words)
    this.saveToStorage("timeToGo", data.time)
    this.saveToStorage("nativeLang", data.nativeLang)
    this.saveToStorage("langTo", data.langTo)
  }

  submit = () => {
    try {
      this.saveData(this.form.value as IFormData)
      alert("Данные сохранены успешно")
    } catch (e) {
      alert("Ошибка сохренения данных")
    }
  }

  get words() {
    return this.form.controls.words as FormControl;
  }

  get time() {
    return this.form.controls.time as FormControl;
  }


}
