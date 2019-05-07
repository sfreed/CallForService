import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { CallForServiceUnit } from '../models/CallForServiceUnit';


@Injectable({
  providedIn:  'root'
})
export class UnitService {

  private activeUnitsDS: DataSource;

  private inactiveUnitsDS: DataSource;

  url = 'http://courtwareapp.azurewebsites.net/api';

  constructor() {
    const customStore = AspNetData.createStore({
      key: 'id',
      loadUrl: this.url + '/CallForServiceUnitActivity',
      insertUrl: this.url + '/CallForServiceUnitActivity',
      updateUrl: this.url + '/CallForServiceUnitActivity',
      deleteUrl: this.url + '/CallForServiceCallDetails',
      onBeforeSend: function(method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
          ajaxOptions.headers = {
            'Authorization': 'bearer ' + localStorage.getItem('id_token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          };

          console.log('ajax', ajaxOptions);
          if (ajaxOptions.method === 'PUT') {
            ajaxOptions.url += '/' + ajaxOptions.data.key;
            ajaxOptions.data = ajaxOptions.data.values;
          }
      },
      onAjaxError : function(e) {
        console.error('activeUnitsList: onAjaxError ', e);
      }
    });

    this.activeUnitsDS = new DataSource({
      loadMode: 'raw',
      load: function(loadOptions) {
        return customStore.load(loadOptions).then(results => {
          console.log('active load results', results);
        });
      },
      update: function(unit_id, unit) {
        return customStore.update(unit_id, unit);
      },
      store: customStore,
      sort: 'unitDescription',
      cacheRawData: false
    });

    this.inactiveUnitsDS = new DataSource({
      loadMode: 'raw',
      load: function(loadOptions) {
        return customStore.load(loadOptions).then(results => {
          console.log('inactive load results', results);
        });
      },
      update: function(unit_id, unit) {
        return customStore.update(unit_id, unit);
      },
      store: customStore,
      sort: 'unitDescription',
      cacheRawData: false
    });
  }

  getActiveUnitsList():  DataSource {
    return this.activeUnitsDS;
  }

  getInactiveUnitsList():  DataSource {
    return this.inactiveUnitsDS;
  }


  changeUnitStatus(unit: CallForServiceUnit) {
    // status 1 = inactive
    // status 2 = active
    this.getActiveUnitsList().store().update(unit.id, unit);
    this.getInactiveUnitsList().store().update(unit.id, unit);
    this.activeUnitsDS.reload();
    this.inactiveUnitsDS.reload();
  }
}
