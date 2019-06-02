import { Injectable, EventEmitter } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import PriorityQueue from 'priorityqueue';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { AvailableUnit } from '../../models/units/AvailableUnit';
import { CallForServiceDAO } from '../../dao/call/CallForServiceDAO.service';
import { AuthenticationService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CallsService {
  callEmitter = new EventEmitter<CallForService>();

  callDetailsEmitter = new EventEmitter<CallForService>();

  private activeCall: CallForService;

  unitCallQueue = new Map();

  constructor(private cfsDAO: CallForServiceDAO, private authService: AuthenticationService) {}

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

    console.log('new Call Started' + JSON.stringify(newCall));

    return this.cfsDAO.getCallListDS().store().insert(newCall).then(call => {
      this.activeCall = call;
    });
  }

  setActiveCall(call: CallForService) {
    this.activeCall = call;
    console.log('active call results', this.activeCall);
    this.callEmitter.emit(this.activeCall);
  }

  saveCall(call: CallForService): Promise<any> {
    return this.cfsDAO.getCallListDS().store().update(call.id, call);
  }

  getActiveCall(): CallForService {
     return this.activeCall;
  }

  addCallToUnitQueue(unit: AvailableUnit, call: CallForService) {
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

  getUnitCalllQueue(unit: AvailableUnit): PriorityQueue {
    return this.unitCallQueue.get(unit.id);
  }
}
