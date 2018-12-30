import { Injectable, ViewChild } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { DispatcherHistory } from 'src/app/models/dispatcher_history';

@Injectable({
  providedIn: 'root'
})
export class DispatcherHistoryService {
  private historyDrawer: DxDrawerComponent;

  private historyList: DispatcherHistory[] = [];

  constructor() { }

  getDispatcherHistoryList(): DispatcherHistory[] {
    return this.historyList;
  }

  getHistoryDrawer(): DxDrawerComponent {
    return this.historyDrawer;
  }

  setHistoryDrawer(historyDrawer: DxDrawerComponent) {
    this.historyDrawer = historyDrawer;
  }

  public addHistoryItem(historyItem: DispatcherHistory) {
    this.historyList.push(historyItem);
  }

  public removeHistoryItem(historyItem: DispatcherHistory) {
    this.historyList.splice(this.historyList.findIndex(item => item.id === historyItem.id), 1);
  }

  toggleDispatcherHistory() {
    this.historyDrawer.instance.toggle();
  }
}
