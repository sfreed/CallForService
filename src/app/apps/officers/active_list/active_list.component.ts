import { Component, ViewChild, OnInit } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DispatcherService } from 'src/app/services/dispatcher.service';
import { CallsService } from 'src/app/services/calls.service';
import { OfficerService } from 'src/app/services/officer.service';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import uuid from 'UUID';
import { Officer } from 'src/app/models/sources/Officer';
import PriorityQueue from 'priorityqueue';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-active-list',
  templateUrl: './active_list.component.html',
  styleUrls: ['./active_list.component.css'],
})
export class ActiveListComponent implements OnInit {
  @ViewChild('inActiveOfficersList') inActiveOfficersList: DxListComponent;

  @ViewChild('activeOfficersList') activeOfficersList: DxListComponent;

  public window: Window = window;

  inActiveOfficers: DataSource;

  activeOfficers: DataSource;

  activeMenuItems: any;

  inactiveMenuItems: any;

  showOfficerQueue = false;

  officerQueue: PriorityQueue;

  constructor(public officerService: OfficerService, public dispatcherHistory: DispatcherService, public callService: CallsService) {
    this.activeMenuItems = [{
      id: 1,
      text: 'Clock Out',
      disabled: false
    }, {
      id: 2,
      text: 'Dispatch To Current Call',
      disabled: false
    }, {
      id: 3,
      text: 'View Officer Call Queue',
      disabled: false
    }];

    this.inactiveMenuItems = [{
      id: 0,
      text: 'Clock in',
      disabled: false
    }];
  }

  ngOnInit() {
    this.activeOfficers = this.officerService.getActiveOfficerList();
    this.inActiveOfficers = this.officerService.getInactiveOfficerList();
  }

  contextItemClick(e, officer) {
    if (e.itemData.id === 0) {
      if (officer.active) {
        notify(officer.first_name + ' ' + officer.last_name  + ' is already clocked in.', 'warning');
      } else {
        this.officerService.changeDutyStatus(officer);
      }
    } else if (e.itemData.id === 1) {
      if (!officer.active) {
        notify(officer.first_name + ' ' + officer.last_name  + ' is already clocked out.', 'warning');
      } else {
        this.officerService.changeDutyStatus(officer);
      }
    } else if (e.itemData.id === 3) {
      this.officerQueue = this.callService.getOfficerQueue(officer);
      this.showOfficerQueue = true;
    } else {
      if (this.callService.getActiveCall() == null) {
        notify('Please Select a Call in which to assign  ' + officer.first_name + ' ' + officer.last_name  + '.', 'waring');
        return;
      }

      if (!officer.active) {
        this.officerService.changeDutyStatus(officer);
      }

      if (this.callService.assignOfficerToActiveCall(officer, this.callService.getActiveCallDetails())) {
        notify('Assigning Officer ' + officer.first_name + ' ' + officer.last_name  + ' to Active Call.', 'success');
      } else {
        notify('Officer ' + officer.first_name + ' ' + officer.last_name  + ' is already assigned to this Call.', 'warning');
      }

      this.dispatcherHistory.addHistoryItem({
        id: uuid(),
        action: 'Assigning to Call ' + this.callService.getActiveCallDetails().callInfoId,
        first_name: officer.first_name,
        last_name: officer.last_name,
        badge_number: officer.badge_number,
        time: new Date()
      });
    }
    this.inActiveOfficersList.instance.reload();
    this.activeOfficersList.instance.reload();
  }

  selectOfficer(e) {
    if (e.itemData.call_status === 'INACTIVE') {
      notify('Officer ' + e.itemData.first_name + ' ' + e.itemData.last_name  + ' not assigned to an Active Call.');
    }
  }

  getOfficerQueue(officer: Officer): number {
    const q = this.callService.getOfficerQueue(officer);
    if (q) {
      return q.size();
    } else {
      return 0;
    }
  }

  createAddress(data) {
    return data.call.address + ' ' + data.call.city + ', ' + data.call.state;
  }

  moveRowUp(cell, options) {
    options.instance.selectRowsByIndexes([cell.rowIndex]).then(r => r[0].order = r[0].order - 1  );
    options.instance.selectRowsByIndexes([cell.rowIndex - 1]).then(r => r[0].order = r[0].order + 1 );
  }

  moveRowDown(cell, options) {
    options.instance.selectRowsByIndexes([cell.rowIndex]).then(r => r[0].order = r[0].order + 1  );
    options.instance.selectRowsByIndexes([cell.rowIndex - 1]).then(r => r[0].order = r[0].order - 1 );
  }

  drop(event: CdkDragDrop<Officer>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const e = {
      itemData: {
        id: 1
      }
    };
    const officer = event.item.data;

    if (event.container.id === 'activeOfficers') {
      e.itemData.id = 0;
    }

    this.contextItemClick(e, officer);
  }
}
