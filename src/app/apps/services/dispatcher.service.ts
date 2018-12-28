import { Injectable, ViewChild } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { DispatcherHistory } from 'src/app/models/dispatcher_history';

@Injectable({
  providedIn: 'root'
})
export class DispatcherHistoryService {
  drawer: DxDrawerComponent;

  public history: DispatcherHistory[] = [];

  constructor() { }

  public addHistory(historyItem: DispatcherHistory) {
    this.history.push(historyItem);
  }

  toggleDispatcherHistory() {
    this.drawer.instance.toggle();
  }

}
