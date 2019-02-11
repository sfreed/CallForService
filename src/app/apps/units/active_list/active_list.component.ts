import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CallsService } from 'src/app/common/services/calls.service';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import uuid from 'UUID';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminService } from 'src/app/common/services/admin.service';
import { DatasourcesService } from 'src/app/common/datasources/Datasources.service';
import { UnitService } from 'src/app/common/services/unit.service';
import { CallForServiceUnit } from 'src/app/common/models/call/CallForServiceUnit';

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

  inActiveUnits: DataSource;

  activeUnits: DataSource;

  activeMenuItems: any;

  inactiveMenuItems: any;

  constructor(public unitService: UnitService, public dispatcherHistory: DispatcherService, public callService: CallsService, public adminService: AdminService,
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
    this.activeUnits = this.dsService.getActiveUnitsList();
    this.inActiveUnits = this.dsService.getInactiveUnitsList();
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
    if (event.previousContainer === event.container) {
      return;
    }
    const e = {
      itemData: {
        id: 1
      }
    };
    const unit = event.item.data;

    if (event.container.id === 'activeUnits') {
      e.itemData.id = 0;
    }

    this.contextItemClick(e, unit);
  }
}
