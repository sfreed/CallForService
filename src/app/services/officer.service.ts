import { Injectable } from '@angular/core';
import { Officer } from '../models/sources/Officer';
import { DispatcherService } from './dispatcher.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { UserDataService } from './UserData';
import uuid from 'UUID';

@Injectable({
  providedIn:  'root'
})
export class OfficerService {

  private activeOfficersList:  DataSource;

  private inactiveOfficerList:  DataSource;

  private allOfficerList:  DataSource;

  constructor(private dispatcherHistory: DispatcherService, public dataService: UserDataService) {
    this.activeOfficersList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getOfficerList()
      }) ,
      filter: [ 'active' , true ],
      sort : ['duty_status',  'last_name'],
      paginate: false
    });

    this.inactiveOfficerList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getOfficerList()
      }) ,
      filter: [ 'active' , false ],
      sort : ['duty_status',  'last_name'],
      paginate: false
    });

    this.allOfficerList =  new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : this.dataService.getOfficerList()
      }),
      sort : ['last_name'],
      paginate: true,
      pageSize: 10
    });
  }

  getActiveOfficerList():  DataSource {
    return this.activeOfficersList;
  }

  getInactiveOfficerList():  DataSource {
    return this.inactiveOfficerList;
  }

  getAllOfficersList() {
    return this.allOfficerList;
  }

  changeDutyStatus(officer: Officer) {
    if (officer.active) {
      officer.active = false;

      this.dispatcherHistory.addHistoryItem({
        id : uuid(),
        action : 'Clock Out',
        first_name : officer.first_name,
        last_name : officer.last_name,
        badge_number : officer.badge_number,
        time : new Date()});

        this.activeOfficersList.store().push(([{ type: 'remove', key: officer.id }]));
        this.inactiveOfficerList.store().push(([{ type: 'insert', data: officer }]));
    } else {
      officer.active = true;

      this.dispatcherHistory.addHistoryItem({
        id :  uuid(),
        action : 'Clock In',
        first_name : officer.first_name,
        last_name : officer.last_name,
        badge_number : officer.badge_number,
        time : new Date()});

        this.inactiveOfficerList.store().push(([{ type: 'remove', key: officer.id }]));
        this.activeOfficersList.store().push(([{ type: 'insert', data: officer }]));
    }
  }
}
