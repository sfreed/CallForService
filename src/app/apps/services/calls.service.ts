import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Call } from 'src/app/models/call';
import { Officer } from 'src/app/models/officer';
import { DxDataGridComponent } from 'devextreme-angular';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  private callGrid: DxDataGridComponent;

  private calls: Promise<Call[]>;

  private activeCall: Call;

  private callForms: any = [{
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

  setCallGrid(callGrid: DxDataGridComponent) {
    this.callGrid = callGrid;
  }
  getCallList(): Promise<Call[]> {
    return this.calls;
  }

  setActiveCall(call: Call) {
    this.activeCall = call;
  }

  getActiveCall(): Call {
     return this.activeCall;
  }

  getCallForms(): any[] {
    return this.callForms;
  }

  assignOfficerToActiveCall(officer: Officer, call: Call) {
    officer.current_call = call.id;
    officer.call_status = 'ACTIVE';
    this.activeCall.officers.push(officer);
  }

  selectCall(id: number) {
    this.callGrid.instance.selectRows([id], false);
    this.callGrid.instance.expandRow(id);
  }
}
