import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ListDataService } from 'src/app/apps/services/ListData';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private callForms: any = [{
    id: 0,
    name: 'Traffic Call'
  }, {
    id: 1,
    name: 'Domestic Call'
  }];

  private callTypeList: DataSource;

  private callStatusList: DataSource;

  constructor(private listDataService: ListDataService) {
      this.callTypeList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.listDataService.getCallTypesList()
        }) ,
        sort : ['description']
      });

      this.callStatusList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.listDataService.getCallStatusList()
        }) ,
        sort : ['description']
      });
  }

  getCallForms(): any[] {
    return this.callForms;
  }

  getCallStatusList(): DataSource {
    return this.callStatusList;
  }

  getCallTypeList(): DataSource {
    return this.callTypeList;
  }
}
