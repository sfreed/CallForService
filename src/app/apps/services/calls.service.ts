import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Call } from 'src/app/models/call';
import { Officer } from 'src/app/models/officer';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  calls: Promise<Call[]>;

  activeCall: Call;

  callForms: any = [{
    id: 0,
    name: 'Traffic Call'
  }, {
    id: 1,
    name: 'Domestic Call'
  }];

  constructor(private http: Http) {
    this.calls = this.http.get('assets/data/calls.json')
      .toPromise()
      .then(res => <Call[]> res.json());
  }

  setActiveCall(call: Call) {
    this.activeCall = call;
  }

  assignOfficerToActiveCall(officer: Officer) {
    this.activeCall.officers.push(officer);
  }
}
