import {Component, Input, OnInit} from '@angular/core';
import IDictionary from "../../models/dictionary";

@Component({
  selector: 'app-repeated-word',
  templateUrl: './repeated-word.component.html',
  styleUrls: ['./repeated-word.component.css']
})
export class RepeatedWordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() word: IDictionary
}
