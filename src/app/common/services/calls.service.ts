import { Injectable, EventEmitter } from '@angular/core';
import DataSource from 'devextreme/data/data_source';


import uuid from 'UUID';
import PriorityQueue from 'priorityqueue';

import { CallForServiceDetails } from 'src/app/common/models/callDetails/CallForServiceDetail';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { CallForServiceType } from '../models/lookups/CallForServiceLookup';
import { DispatchedByPerson } from '../models/call/DispatchedByPerson';
import { ComplainantPerson } from '../models/call/ComplainantPerson';
import { CallForServiceUnit } from '../models/unit/CallForServiceUnit';
import { InvolvedUnitsItem } from '../models/callDetails/InvolvedUnitItem';
import { CallForServiceDAO } from '../dao/CallForServiceDAO.service';
import { CallForServiceDetailsDAO } from '../dao/CallForServiceDetailsDAO.service';
import { AuthenticationService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  callEmitter = new EventEmitter<CallForService>();

  callDetailsEmitter = new EventEmitter<CallForServiceDetails>();

  private activeCall: CallForService;

  private activeCallDetails: CallForServiceDetails;

  unitCallQueue = new Map();

  constructor(private cfsDAO: CallForServiceDAO, private cfsdDAO: CallForServiceDetailsDAO, private authService: AuthenticationService) {}

  getCallList(type: number): DataSource {
    return this.cfsDAO.getCallListDS(type);
  }

  startNewCall(callType: CallForServiceType) {
    this.activeCall = new CallForService();
    this.activeCall.id = 0;
    this.activeCall.isVoid = false;
    this.activeCall.createdUserId = this.authService.getUser().id;
    this.activeCall.effectiveDateTime = new Date().toISOString();
    this.activeCall.typeId = callType.id;
    this.activeCall.receivedDateTime = new Date().toISOString();
    this.activeCall.dispatchedByPerson = this.authService.getUser();

    this.activeCallDetails = new CallForServiceDetails();

    console.log('this.call' + JSON.stringify(this.activeCall));

    this.cfsDAO.getCallListDS().store().insert(this.activeCall).then(call => {
      this.activeCall = call;
      this.activeCallDetails = this.cfsdDAO.getCallDetailsDS().store().byKey(call.id).then(details => {
        this.activeCallDetails = details;
      });
    });
  }

  setActiveCall(call: CallForService) {
    this.activeCall = call;
    console.log('active call results', this.activeCall);
    this.cfsdDAO.getCallDetailsDS().store().byKey(this.activeCall.id)
      .then(result => {
        console.log('detail results', result);
        this.activeCallDetails = result;
      }).then(results => {
        this.callEmitter.emit(this.activeCall);
        this.callDetailsEmitter.emit(results);
      });
  }

  saveCall(call: CallForService) {
    this.cfsDAO.getCallListDS().store().update(call.id, call);
  }

  getActiveCall(): CallForService {
     return this.activeCall;
  }

  getActiveCallDetails(): CallForServiceDetails {
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

    const involvedUnit = new InvolvedUnitsItem();
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

  addCallToUnitQueue(unit: CallForServiceUnit, call: CallForServiceDetails) {
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
