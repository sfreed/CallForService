import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CallsService } from 'src/app/common/services/calls.service';
import { OfficerService } from 'src/app/common/services/officer.service';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import uuid from 'UUID';
import { Officer } from 'src/app/common/models/sources/Officer';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminService } from 'src/app/common/services/admin.service';
import { DatasourcesService } from 'src/app/common/datasources/Datasources.service';

@Component({
  selector: 'app-active-list',
  templateUrl: './active_list.component.html',
  styleUrls: ['./active_list.component.css'],
})
export class ActiveListComponent implements OnInit {
  @ViewChild('inActiveOfficersList') inActiveOfficersList: DxListComponent;

  @ViewChild('activeOfficersList') activeOfficersList: DxListComponent;

  adminFormEmitter: any;

  public window: Window = window;

  inActiveOfficers: DataSource;

  activeOfficers: DataSource;

  activeMenuItems: any;

  inactiveMenuItems: any;

  constructor(public officerService: OfficerService, public dispatcherHistory: DispatcherService, public callService: CallsService, public adminService: AdminService,
    private dsService: DatasourcesService) {
    this.adminFormEmitter = adminService.adminFormEmitter;

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
    this.activeOfficers = this.dsService.getActiveOfficerList();
    this.inActiveOfficers = this.dsService.getInactiveOfficerList();
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
      this.adminFormEmitter.emit(['officerQueue', true, officer]);
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

  getOfficerQueueCount(officer: Officer): number {
    const q = this.callService.getOfficerQueue(officer);
    if (q) {
      return q.size();
    } else {
      return 0;
    }
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
