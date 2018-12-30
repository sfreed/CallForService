import { Injectable } from '@angular/core';
import { Officer } from '../../models/officer';
import { Http } from '@angular/http';
import { DispatcherHistory } from 'src/app/models/dispatcher_history';
import { DispatcherHistoryService } from './dispatcher.service';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private officers: Promise<Officer[]>;

  constructor(private http: Http, private dispatcherHistory: DispatcherHistoryService) {
    this.officers = this.http.get('assets/data/officers.json')
      .toPromise()
      .then(res => <Officer[]> res.json());
  }

  getOfficerList(): Promise<Officer[]> {
    return this.officers;
  }

  changeDutyStatus(officer: Officer) {
    console.log('changing duty status');
    if (officer.active) {
      officer.active = false;

      this.dispatcherHistory.addHistoryItem({
        id: 0,
        action: 'Clock Out',
        first_name: officer.first_name,
        last_name: officer.last_name,
        badge_number: officer.badge_number,
        time: new Date()});
    } else {
      officer.active = true;

      this.dispatcherHistory.addHistoryItem({
        id: 0,
        action: 'Clock In',
        first_name: officer.first_name,
        last_name: officer.last_name,
        badge_number: officer.badge_number,
        time: new Date()});
    }

    this.officers.then(res => {
      res.forEach(o => {
        if (o.id === officer.id) {
          o.active = officer.active;
        }
      });
    });
  }
}
