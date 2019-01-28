import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ListDataService } from './ListData';

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

  private agencyTypeList: DataSource;

  private addressTypeList: DataSource;

  private contactTypeList: DataSource;

  private officerRankList: DataSource;

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

      this.agencyTypeList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.listDataService.getAgencyTypeList()
        }) ,
        sort : ['description']
      });

      this.addressTypeList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.listDataService.getAddressTypeList()
        }) ,
        sort : ['description']
      });

      this.contactTypeList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.listDataService.getContactTypeList()
        }) ,
        sort : ['description']
      });

      this.officerRankList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.listDataService.getOfficerRankList()
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

  getAgencyTypeList(): DataSource {
    return this.agencyTypeList;
  }

  getAddressTypeList(): DataSource {
    return this.addressTypeList;
  }

  getContactTypeList(): DataSource {
    return this.contactTypeList;
  }

  getOfficerRankList(): DataSource {
    return this.officerRankList;
  }
}
