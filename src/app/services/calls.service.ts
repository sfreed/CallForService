import { Injectable, EventEmitter } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { CallDetail } from 'src/app/models/call/CallDetail';
import { Officer } from 'src/app/models/officer';
import { UserDataService } from './UserData';
import PriorityQueue from 'priorityqueue';
import { Call } from 'src/app/models/call/Call';


@Injectable({
  providedIn: 'root'
})
export class CallsService {
  callEmitter = new EventEmitter<Call>();

  private callList: DataSource;

  private callDetailList: DataSource;

  private activeCall: Call;

  private activeCallDetails: CallDetail;

  officerQueue = new Map();

  constructor(private userDataService: UserDataService) {
    this.callList = new DataSource({
        store : new ArrayStore({
          key : 'id',
          data : this.userDataService.getCallList()
        }) ,
        sort : ['date',  'time'],
        paginate : true,
        pageSize : 18
      });

      this.callDetailList = new DataSource({
        store : new ArrayStore({
          key : 'callInfoId',
          data : this.userDataService.getCallDetailsList()
        })
      });
  }

  getCallList(): DataSource {
    return this.callList;
  }

  getCallDetailsList(): DataSource {
    return this.callDetailList;
  }

  setActiveCall(call: Call) {
    this.activeCall = call;

    this.callDetailList.filter(['callInfoId', call.id]);

    this.callDetailList.load().then(result => {
      this.activeCallDetails = result[0];
    })
    .then(result => this.callEmitter.emit(this.activeCall));
  }

  getActiveCall(): Call {
     return this.activeCall;
  }

  getActiveCallDetails(): CallDetail {
    return this.activeCallDetails;
 }

  assignOfficerToActiveCall(officer: Officer, call: CallDetail): boolean {
    officer.current_call = call.callInfoId;
    officer.call_status = 'ACTIVE';
    const d: Date = new Date();

    let officerIsAssigned = true;

    this.activeCallDetails.officers.forEach(activeOfficer => {
      if (activeOfficer.officer.id === officer.id) {
        officerIsAssigned = false;
      }
    });

    if (officerIsAssigned) {
      this.activeCallDetails.officers.push({officer: officer, time: d.getHours() + ':' + d.getMinutes()});
      this.addCallToOfficerQueue(officer, call);
    }

    return officerIsAssigned;
  }

  addCallToOfficerQueue(officer: Officer, call: CallDetail) {
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

  getOfficerQueue(officer: Officer): PriorityQueue {
    return this.officerQueue.get(officer.id);
  }
}
