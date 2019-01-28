import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { UserDataService } from './UserData';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private hospitalList: DataSource;

  constructor(private dataService: UserDataService) {
    this.hospitalList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getHospitalList()
      })
    });
  }

  getHospitalList(): DataSource {
    return this.hospitalList;
  }
}
