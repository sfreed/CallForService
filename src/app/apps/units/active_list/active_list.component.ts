import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CallsService } from 'src/app/common/services/calls.service';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import uuid from 'UUID';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminService } from 'src/app/common/services/admin.service';
import { UnitService } from 'src/app/common/services/unit.service';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { CallForServiceUnit } from 'src/app/common/models/CallForServiceUnit';

@Component({
  selector: 'app-active-list',
  templateUrl: './active_list.component.html',
  styleUrls: ['./active_list.component.css'],
})
export class ActiveListComponent implements OnInit {
  @ViewChild('inActiveUnitsList') inActiveUnitsList: DxListComponent;

  @ViewChild('activeUnitsList') activeUnitsList: DxListComponent;

  adminFormEmitter: any;

  public window: Window = window;

  activeUnits: DataSource;

  inactiveUnits: DataSource;

  activeMenuItems: any;

  inactiveMenuItems: any;

  constructor(public unitService: UnitService, public dispatcherHistory: DispatcherService, public callService: CallsService, public adminService: AdminService, private authService: AuthenticationService) {
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
      text: 'View Unit Call Queue',
      disabled: false
    }];

    this.inactiveMenuItems = [{
      id: 0,
      text: 'Clock in',
      disabled: false
    }];
  }

  ngOnInit() {
    this.activeUnits = this.unitService.getActiveUnitsList();
    this.inactiveUnits = this.unitService.getInactiveUnitsList();
  }

  contextItemClick(e, unit) {
    if (e.itemData.id === 0) {
      if (unit.active) {
        // notify(officer.first_name + ' ' + officer.last_name  + ' is already clocked in.', 'warning');
      } else {
        this.unitService.changeUnitStatus(unit);
      }
    } else if (e.itemData.id === 1) {
      if (!unit.active) {
        // notify(officer.first_name + ' ' + officer.last_name  + ' is already clocked out.', 'warning');
      } else {
        this.unitService.changeUnitStatus(unit);
      }
    } else if (e.itemData.id === 3) {
      this.adminFormEmitter.emit(['unitQueue', true, unit]);
    } else {
      if (this.callService.getActiveCall() == null) {
        // notify('Please Select a Call in which to assign  ' + officer.first_name + ' ' + officer.last_name  + '.', 'waring');
        return;
      }

      if (!unit.active) {
        this.unitService.changeUnitStatus(unit);
      }

      if (this.callService.assignUnitToActiveCall(unit)) {
        // notify('Assigning Officer ' + officer.first_name + ' ' + officer.last_name  + ' to Active Call.', 'success');
      } else {
        // notify('Officer ' + officer.first_name + ' ' + officer.last_name  + ' is already assigned to this Call.', 'warning');
      }
    }
    this.inActiveUnitsList.instance.reload();
    this.activeUnitsList.instance.reload();
  }

  selectUnit(e) {
    if (e.itemData.call_status === 'INACTIVE') {
      // notify('Officer ' + e.itemData.first_name + ' ' + e.itemData.last_name  + ' not assigned to an Active Call.');
    }
  }

  getUnitQueueCount(unit: CallForServiceUnit): number {
    const q = this.callService.getUnitCalllQueue(unit);
    if (q) {
      return q.size();
    } else {
      return 0;
    }
  }

  drop(event: CdkDragDrop<CallForServiceUnit>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      return;
    }

    if (event.container.id === 'activeUnits') {
      event.item.data.dateTimeIn = new Date();
      event.item.data.effectiveDateTime = new Date();
      event.item.data.createdUserId = this.authService.getUser().id;
      event.item.data.status = 2;
      event.item.data.startMiles = 0;
    }

    if (event.container.id === 'inActiveUnits') {
      event.item.data.dateTimeOut = new Date();
      event.item.data.effectiveDateTime = new Date();
      event.item.data.createdUserId = this.authService.getUser().id;
      event.item.data.status = 1;
      event.item.data.endMiles = 0;
    }

    this.unitService.changeUnitStatus(event.item.data);
  }
}
