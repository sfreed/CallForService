import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { UserDataService } from './UserData';

@Injectable({
  providedIn: 'root'
})
export class AvailableUnitService {
  private availableUnitList: DataSource;

  constructor(private dataService: UserDataService) {
    this.availableUnitList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getAvailableUnitList()
      })
    });
  }

  getAvailableUnitList(): DataSource {
    return this.availableUnitList;
  }

}
