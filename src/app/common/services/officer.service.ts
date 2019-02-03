import { Injectable } from '@angular/core';
import { Officer } from '../models/sources/Officer';
import { DispatcherService } from './dispatcher.service';
import uuid from 'UUID';
import { DatasourcesService } from '../datasources/Datasources.service';

@Injectable({
  providedIn:  'root'
})
export class OfficerService {

  constructor(private dispatcherHistory: DispatcherService, public dsService: DatasourcesService) {}

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

        this.dsService.getActiveOfficerList().store().push(([{ type: 'remove', key: officer.id }]));
        this.dsService.getInactiveOfficerList().store().push(([{ type: 'insert', data: officer }]));
    } else {
      officer.active = true;

      this.dispatcherHistory.addHistoryItem({
        id :  uuid(),
        action : 'Clock In',
        first_name : officer.first_name,
        last_name : officer.last_name,
        badge_number : officer.badge_number,
        time : new Date()});

        this.dsService.getInactiveOfficerList().store().push(([{ type: 'remove', key: officer.id }]));
        this.dsService.getActiveOfficerList().store().push(([{ type: 'insert', data: officer }]));
    }
  }
}
