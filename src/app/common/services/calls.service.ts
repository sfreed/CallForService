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

  getCallList(key, value): DataSource {
    return this.cfsDAO.getCallListDS(key, value);
  }

  startNewCall(newCall: CallForService): Promise<any> {
    newCall.id = 0;
    newCall.isVoid = false;
    newCall.createdUserId = this.authService.getUser().id;
    newCall.effectiveDateTime = new Date().toISOString();
    if (newCall.complainantPerson) {
      newCall.complainantPerson.id = '00000000-0000-0000-0000-000000000000';
    }

    if (newCall.locationPrimary) {
      newCall.locationPrimary.id = '00000000-0000-0000-0000-000000000000';
    }

    this.activeCallDetails = new CallForServiceDetails();

    console.log('new Call Started' + JSON.stringify(newCall));

    return this.cfsDAO.getCallListDS().store().insert(newCall).then(call => {
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
