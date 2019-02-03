import { Component, OnInit } from '@angular/core';
import PriorityQueue from 'priorityqueue';
import { AdminService } from 'src/app/common/services/admin.service';
import { CallsService } from 'src/app/common/services/calls.service';
import { Officer } from 'src/app/common/models/sources/Officer';

@Component({
  selector: 'app-officer-queue',
  templateUrl: './officerQueue.component.html',
  styleUrls: ['./officerQueue.component.css']
})
export class OfficerQueueComponent implements OnInit {
  isVisible = false;

  officerQueue: PriorityQueue;

  constructor(public callService: CallsService, public adminService: AdminService) {
    this.adminService.adminFormEmitter.subscribe(
      (data: [string, boolean, Officer]) => {
        if (data[0] === 'officerQueue') {
          this.isVisible = data[1];
          this.officerQueue = this.callService.getOfficerQueue(data[2]);
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
