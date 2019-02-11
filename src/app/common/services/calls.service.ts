import { Injectable, EventEmitter } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { CallDetail } from 'src/app/common/models/call/CallDetail';

import { UserDataService } from './UserData';
import PriorityQueue from 'priorityqueue';
import { Call } from 'src/app/common/models/call/Call';
import { CallForServiceUnit } from '../models/call/CallForServiceUnit';
import { InvolvedUnit } from '../models/call/InvolvedUnit';
import uuid from 'UUID';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  callEmitter = new EventEmitter<Call>();

  private callList: DataSource;

  private callDetailList: DataSource;

  private activeCall: Call;

  private activeCallDetails: CallDetail;

  unitCallQueue = new Map();

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

    this.callDetailList.store().byKey(call.id)
      .then(result => this.activeCallDetails = result)
      .then(result => this.callEmitter.emit(this.activeCall));
  }

  getActiveCall(): Call {
     return this.activeCall;
  }

  getActiveCallDetails(): CallDetail {
    return this.activeCallDetails;
 }

  assignUnitToActiveCall(unit: CallForServiceUnit): boolean {
    const d: Date = new Date();

    let isUnitAssigned = true;

    this.activeCallDetails.involvedUnits.forEach(activeunit => {
      if (activeunit.id === unit.id) {
        isUnitAssigned = false;
      }
    });

    const involvedUnit = new InvolvedUnit();
    involvedUnit.id = uuid();
    involvedUnit.callForServiceUnit = unit;
    involvedUnit.callForServiceId = this.getActiveCall().id;
    involvedUnit.isPrimaryUnit = true;
    involvedUnit.callForServiceDateTime = this.getActiveCall().receivedDateTime;
    involvedUnit.dispatchDateTime = new Date().toDateString();


    if (isUnitAssigned) {
      this.activeCallDetails.involvedUnits.push(involvedUnit);
      this.addCallToUnitQueue(unit, this.activeCallDetails);
    }

    return isUnitAssigned;
  }

  addCallToUnitQueue(unit: CallForServiceUnit, call: CallDetail) {
    let queue: PriorityQueue = this.unitCallQueue.get(unit.id);

    if (queue == null) {
      queue = new PriorityQueue({
        comparator: (a, b) =>
          a.order !== b.order ? a.order - b.order : a.order - b.order
      });
    }
    queue.push({order: queue.size(), call});

    this.unitCallQueue.set(unit.id, queue);
  }

  getUnitCalllQueue(unit: CallForServiceUnit): PriorityQueue {
    return this.unitCallQueue.get(unit.id);
  }
}
