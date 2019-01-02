import { Injectable } from '@angular/core';
import { Officer } from '../../models/officer';
import { DispatcherHistoryService } from './dispatcher.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { DataService } from './data';
import uuid from 'UUID';

@Injectable({
  providedIn:  'root'
})
export class OfficerService {

  private officerList:  DataSource;

  constructor(private dispatcherHistory: DispatcherHistoryService, dataService: DataService) {
    this.officerList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getOfficerList()
      }) ,
      sort : ['duty_status',  'last_name'],
      paginate : true,
      pageSize : 18
    });
  }

  getOfficerList():  DataSource {
    return this.officerList;
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
    } else {
      officer.active = true;

      this.dispatcherHistory.addHistoryItem({
        id :  uuid(),
        action : 'Clock In',
        first_name : officer.first_name,
        last_name : officer.last_name,
        badge_number : officer.badge_number,
        time : new Date()});
    }
  }
}
