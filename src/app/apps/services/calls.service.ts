import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Call } from 'src/app/models/call';
import { Officer } from 'src/app/models/officer';
import { DxDataGridComponent } from 'devextreme-angular';
import { DataService } from './data';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  private callGrid: DxDataGridComponent;

  private callList: DataSource;

  private activeCall: Call;

  private callForms: any = [{
    id: 0,
    name: 'Traffic Call'
  }, {
    id: 1,
    name: 'Domestic Call'
  }];

  constructor(private dataService: DataService) {
    this.callList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.dataService.getCallList()
        }) ,
        sort : ['date',  'time'],
        paginate : true,
        pageSize : 18
      });
  }

  setCallGrid(callGrid: DxDataGridComponent) {
    this.callGrid = callGrid;
  }

  getCallList(): DataSource {
    return this.callList;
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

  assignOfficerToActiveCall(officer: Officer, call: Call): boolean {
    officer.current_call = call.id;
    officer.call_status = 'ACTIVE';
    const d: Date = new Date();

    let officerIsAssigned = true;

    this.activeCall.officers.forEach(activeOfficer => {
      if (activeOfficer.officer.id === officer.id) {
        officerIsAssigned = false;
      }
    });

    if (officerIsAssigned) {
      this.activeCall.officers.push({officer: officer, time: d.getHours() + ':' + d.getMinutes()});
    }

    return officerIsAssigned;
  }

  selectCall(id: number) {
    this.callGrid.instance.selectRows([id], false);
    this.callGrid.instance.expandRow(id);
  }

  initializeGrid() {
    this.callGrid.instance.selectRowsByIndexes([0]);
  }
}
