import { Injectable } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { DispatcherHistory } from 'src/app/common/models/history';
import CustomStore from 'devextreme/data/custom_store';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { MasterUserDAO } from '../dao/MasterUserDAO.service';
import DataSource from 'devextreme/data/data_source';
@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
  private historyDrawer: DxDrawerComponent;

  private historyList: CustomStore;


  url = 'http://courtwareapp.azurewebsites.net/api';

  constructor(private masterUserDAO: MasterUserDAO) {
    this.historyList = AspNetData.createStore({
      key: 'id',
      loadUrl: this.url + '/MasterUser',
      insertUrl: this.url + '/MasterUser',
      updateUrl: this.url + '/MasterUser',
      deleteUrl: this.url + '/MasterUser',
      onBeforeSend: function(method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: false };
      }
    });
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
