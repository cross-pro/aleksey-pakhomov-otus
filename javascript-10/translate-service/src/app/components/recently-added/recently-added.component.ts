import {Component, OnInit} from '@angular/core';
import IDictionary from "../../models/dictionary";
import {TranslateService} from "../../services/translate/translate.service";
import {StoreService} from "../../services/store/store.service";
import {Observable} from "rxjs";
import {MessageService} from "../../services/message/message.service";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {

  constructor(private translateService: TranslateService,
              private storeService: StoreService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.updateList()
    this.messageService.message$.subscribe(()=>{
      this.updateList()
    })
  }

  store$: Observable<IDictionary[]>

  dictionary: IDictionary[] = []

  updateList = () => {
    this.store$ = this.storeService.getAllWords()
  }


}
