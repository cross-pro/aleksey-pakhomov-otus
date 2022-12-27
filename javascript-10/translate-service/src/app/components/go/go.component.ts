import { Component, OnInit } from '@angular/core';
import {GoService} from "../../services/go/go.service";

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css']
})
export class GoComponent implements OnInit {

  constructor(private goService: GoService) { }

  ngOnInit(): void {
  }

  started = false;
  result = 0
  error = 0
  time = 300

  start = () => {
    this.started = true
  }



}
