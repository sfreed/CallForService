import { Injectable } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { DispatcherHistory } from 'src/app/models/history';
import { DataService } from './data';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
@Injectable({
  providedIn: 'root'
})
export class DispatcherHistoryService {
  private historyDrawer: DxDrawerComponent;

  private historyList: DataSource;

  constructor(private dataService: DataService) {
    this.historyList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getHistoryList()
      }) ,
      sort : ['date',  'time'],
      paginate : true,
      pageSize : 18,
      onChanged: (e) => { console.log(e); }
    });
  }

  getDispatcherHistoryList(): DataSource {
    return this.historyList;
  }

  getHistoryDrawer(): DxDrawerComponent {
    return this.historyDrawer;
  }

  setHistoryDrawer(historyDrawer: DxDrawerComponent) {
    this.historyDrawer = historyDrawer;
  }

  public addHistoryItem(historyItem: DispatcherHistory) {
    this.historyList.store().push([{ type: 'insert', data: historyItem }]);
  }

  public removeHistoryItem(historyItem: DispatcherHistory) {
    this.historyList.store().remove(historyItem.id);
  }

  toggleDispatcherHistory() {
    this.historyDrawer.instance.toggle();
  }
}
