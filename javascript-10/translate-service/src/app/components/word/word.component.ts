import {Component, Input, OnInit} from '@angular/core';
import IDictionary from "../../models/dictionary";

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() dictionary: IDictionary

  showTranslate = false
}
