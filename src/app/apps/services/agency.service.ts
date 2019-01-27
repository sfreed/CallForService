import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { UserDataService } from './UserData';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private agencyList: DataSource;

  constructor(private dataService: UserDataService) {
    this.agencyList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getAgencyList()
      })
    });
  }

  getAgencyList(): DataSource {
    return this.agencyList;
  }

}
