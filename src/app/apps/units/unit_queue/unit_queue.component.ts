import { Component, OnInit } from '@angular/core';
import PriorityQueue from 'priorityqueue';
import { AdminService } from 'src/app/common/services/admin.service';
import { CallsService } from 'src/app/common/services/calls.service';
import { CallForServiceUnit } from 'src/app/common/models/unit/CallForServiceUnit';

@Component({
  selector: 'app-unit-queue',
  templateUrl: './unit_queue.component.html',
  styleUrls: ['./unit_queue.component.css']
})
export class UnitQueueComponent implements OnInit {
  isVisible = false;

  unitQueue: PriorityQueue;

  constructor(public callService: CallsService, public adminService: AdminService) {
    this.adminService.adminFormEmitter.subscribe(
      (data: [string, boolean, CallForServiceUnit]) => {
        if (data[0] === 'unitQueue') {
          this.isVisible = data[1];
          this.unitQueue = this.callService.getUnitCalllQueue(data[2]);
        }
      });
  }

  ngOnInit() {
  }

  moveRowUp(cell, options) {
    options.instance.selectRowsByIndexes([cell.rowIndex]).then(r => r[0].order = r[0].order - 1  );
    options.instance.selectRowsByIndexes([cell.rowIndex - 1]).then(r => r[0].order = r[0].order + 1 );
  }

  moveRowDown(cell, options) {
    options.instance.selectRowsByIndexes([cell.rowIndex]).then(r => r[0].order = r[0].order + 1  );
    options.instance.selectRowsByIndexes([cell.rowIndex - 1]).then(r => r[0].order = r[0].order - 1 );
  }

  createAddress(data) {
    return data.call.address + ' ' + data.call.city + ', ' + data.call.state;
  }
}
