import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { CallDetails } from 'src/app/models/CallDetails';
import { Officer } from 'src/app/models/officer';
import { DxDataGridComponent } from 'devextreme-angular';
import { DataService } from './data';
import PriorityQueue from 'priorityqueue';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  private callGrid: DxDataGridComponent;

  private callList: DataSource;

  private callTypeList: DataSource;

  private callStatusList: DataSource;

  private activeCall: CallDetails;

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

      this.callTypeList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.dataService.getCallTypesList()
        }) ,
        sort : ['description']
      });

      this.callStatusList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.dataService.getCallStatusList()
        }) ,
        sort : ['description']
      });
  }

  setCallGrid(callGrid: DxDataGridComponent) {
    this.callGrid = callGrid;
  }

  getCallList(): DataSource {
    return this.callList;
  }

  getCallStatusList(): DataSource {
    return this.callStatusList;
  }

  getCallTypeList(): DataSource {
    return this.callTypeList;
  }

  setActiveCall(call: CallDetails) {
    this.activeCall = call;
  }

  getActiveCall(): CallDetails {
     return this.activeCall;
  }

  getCallForms(): any[] {
    return this.callForms;
  }

  assignOfficerToActiveCall(officer: Officer, call: CallDetails): boolean {
    officer.current_call = call.callInfoId;
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
      this.addCallToOfficerQueue(officer, call);
    }

    return officerIsAssigned;
  }

  addCallToOfficerQueue(officer: Officer, call: CallDetails) {
    let queue: PriorityQueue = this.officerQueue.get(officer.id);

    if (queue == null) {
      queue = new PriorityQueue({
        comparator: (a, b) =>
          a.order !== b.order ? a.order - b.order : a.order - b.order
      });
    }
    queue.push({order: queue.size(), call});

    this.officerQueue.set(officer.id, queue);

    console.log(queue.toArray());
  }

  getOfficerQueue(officer: Officer): PriorityQueue {
    return this.officerQueue.get(officer.id);
  }
}
