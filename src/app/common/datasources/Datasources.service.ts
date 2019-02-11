import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { UserDataService } from 'src/app/common/services/UserData';

@Injectable({
  providedIn: 'root'
})
export class DatasourcesService {
  private agencyList: DataSource;
  private availableUnitList: DataSource;
  private hospitalList: DataSource;

  private activeUnitsList:  DataSource;
  private inactiveUnitsList:  DataSource;
  private allUnitsList:  DataSource;

  constructor(private personLookupService: PersonLookupService, private dataService: UserDataService) {
    this.agencyList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : personLookupService.agencyList
      })
    });

    this.availableUnitList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getAvailableUnitList()
      })
    });

    this.hospitalList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getHospitalList()
      })
    });

    this.activeUnitsList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getUnitList()
      }) ,
      filter: [ 'active' , true ],
      sort : ['duty_status',  'last_name'],
      paginate: false
    });

    this.inactiveUnitsList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getUnitList()
      }) ,
      filter: [ 'active' , false ],
      sort : ['duty_status',  'last_name'],
      paginate: false
    });

    this.allUnitsList =  new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : this.dataService.getUnitList()
      }),
      sort : ['last_name'],
      paginate: true,
      pageSize: 10
    });
  }

  getAgencyList(): DataSource {
    return this.agencyList;
  }

  getAvailableUnitList(): DataSource {
    return this.availableUnitList;
  }

  getHospitalList(): DataSource {
    return this.hospitalList;
  }

  getActiveUnitsList():  DataSource {
    return this.activeUnitsList;
  }

  getInactiveUnitsList():  DataSource {
    return this.inactiveUnitsList;
  }

  getAllUnitsList() {
    return this.allUnitsList;
  }

}
