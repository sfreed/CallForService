import { Injectable } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { DispatcherHistory } from 'src/app/common/models/common/history';
import CustomStore from 'devextreme/data/custom_store';
import { MasterUserDAO } from '../../dao/master/MasterUserDAO.service';
import DataSource from 'devextreme/data/data_source';
import { URL } from '../../models/common/URL.enum';
@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
  private historyDrawer: DxDrawerComponent;

  private historyList: CustomStore;

  constructor(private masterUserDAO: MasterUserDAO) {

  }

  getDispatcherHistoryList(): CustomStore {
    return this.historyList;
  }

  getDispatcherList(): DataSource {
    return this.masterUserDAO.getMasterUsersDS();
  }

  getHistoryDrawer(): DxDrawerComponent {
    return this.historyDrawer;
  }

  setHistoryDrawer(historyDrawer: DxDrawerComponent) {
    this.historyDrawer = historyDrawer;
  }

  public addHistoryItem(historyItem: DispatcherHistory) {
    this.historyList.push([{ type: 'insert', data: historyItem }]);
  }

  public removeHistoryItem(historyItem: DispatcherHistory) {
    this.historyList.remove(historyItem.id);
  }

  toggleDispatcherHistory() {
    this.historyDrawer.instance.toggle();
  }
}
