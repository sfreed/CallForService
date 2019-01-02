import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Call } from 'src/app/models/call';
import { Officer } from 'src/app/models/officer';
import { DxDataGridComponent } from 'devextreme-angular';
import { DataService } from './data';
import PriorityQueue from 'priorityqueue';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  private callGrid: DxDataGridComponent;

  private callList: DataSource;

  private activeCall: Call;

  officerQueue = new Map();

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

    // this.addCallToOfficerQueue(officer, call);

    return officerIsAssigned;
  }

  selectCall(id: number) {
    this.callGrid.instance.selectRows([id], false);
    this.callGrid.instance.expandRow(id);
  }

  initializeGrid() {
    this.callGrid.instance.selectRowsByIndexes([0]);
  }

  addCallToOfficerQueue(officer: Officer, call: Call) {
    let queue: PriorityQueue = this.officerQueue.get(officer.id);

    if (queue == null) {
      queue = new PriorityQueue({
        comparator: (a, b) =>
          a.order !== b.order ? a.order - b.order : a.order - b.order
      });
    }
    queue.push({order: queue.size(), call});

    this.officerQueue.set(officer.id, queue);
  }
}
