import { Injectable } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { DispatcherHistory } from 'src/app/models/history';
import { UserDataService } from './UserData';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
  private historyDrawer: DxDrawerComponent;

  private historyList: DataSource;

  private dispatcherList: DataSource;

  constructor(private dataService: UserDataService) {
    this.historyList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getHistoryList()
      }) ,
      sort : ['date',  'time'],
      paginate : true,
      pageSize : 18
    });

    this.dispatcherList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : this.dataService.getDispatcherList()
      }) ,
      sort : ['fullName']
    });
  }

  getDispatcherHistoryList(): DataSource {
    return this.historyList;
  }

  getDispatcherList(): DataSource {
    return this.dispatcherList;
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
