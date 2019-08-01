import { Component, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DispatcherService } from 'src/app/common/services/master/Dispatcher.service';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import DataSource from 'devextreme/data/data_source';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AdminService } from 'src/app/common/services/common/Admin.service';
import { UnitService } from 'src/app/common/services/units/Unit.service';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { AvailableUnit } from 'src/app/common/models/units/AvailableUnit';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { DatePipe } from '@angular/common';
import { CallForServiceUnitType } from 'src/app/common/models/lookups/callForService/CallForServiceUnitType';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/callForService/CallForServiceLookup.service';

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

  activeMenuItems: any;

  inactiveMenuItems: any;

  callForServiceUnitTypeList: CallForServiceUnitType[];

  currentUnit: AvailableUnit;
  showStartMileageScreen = false;
  showEndMileageScreen = false;

  constructor(public unitService: UnitService, public dispatcherHistory: DispatcherService, public callService: CallsService, public adminService: AdminService,
    private authService: AuthenticationService, private involvedUnitService: InvolvedUnitsService, private datePipe: DatePipe, private cfsLookupService: CallForServiceLookupService) {
    this.adminFormEmitter = adminService.adminFormEmitter;

    this.adminFormEmitter.subscribe((data) => {
      console.log('received event');
      if (data[0] === 'refreshActiveUnitList') {

        console.log('received refreshActiveUnitList event');

        this.activeUnitsList.instance.reload();
      }
    });

    this.callForServiceUnitTypeList = this.cfsLookupService.callForServiceUnitTypeList;
    this.activeUnits = this.unitService.getCurrentActiveUnitsDS();
  }

  ngOnInit() {

  }

  getUnitActivityImage(e: AvailableUnit, activeFlag) {
    const unitType: CallForServiceUnitType = this.callForServiceUnitTypeList.filter(r => r.id === e.unitType)[0];

    if (e.currentCall && activeFlag) {
      return  '../../../../assets/' + unitType.unitCode + '_assigned.png';
    } else {
      return '../../../../assets/' + unitType.unitCode + '_unassigned.png';
    }
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

      if (this.involvedUnitService.assignUnitToActiveCall(unit)) {
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

  getUnitQueueCount(unit: AvailableUnit): number {
    const q = this.callService.getUnitCalllQueue(unit);
    if (q) {
      return q.size();
    } else {
      return 0;
    }
  }

  drop(event: CdkDragDrop<AvailableUnit>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      return;
    }

    if (event.container.id === 'activeUnits') {
      event.item.data.dateTimeIn = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      event.item.data.effectiveDateTime = new Date();
      event.item.data.createdUserId = this.authService.getUser().id;
      event.item.data.status = 2;
      event.item.data.startMiles = 0;
      console.log('activating', event.item.data);

      this.currentUnit = event.item.data;
      this.showStartMileageScreen = true;
    }

    if (event.container.id === 'inActiveUnits') {
      event.item.data.dateTimeOut = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      event.item.data.effectiveDateTime = new Date();
      event.item.data.createdUserId = this.authService.getUser().id;
      event.item.data.status = 1;
      event.item.data.endMiles = 0;
      console.log('deactivating', event.item.data);

      this.currentUnit = event.item.data;
      this.showEndMileageScreen = true;
    }
  }

  updateUnit() {
    this.unitService.changeUnitStatus(this.currentUnit).then(results => {
      this.showStartMileageScreen = false;
      this.showEndMileageScreen = false;
      this.activeUnitsList.instance.reload();
      this.inActiveUnitsList.instance.reload();
    });

  }

  cancelUpdateUnit() {
    this.currentUnit = null;
    this.showStartMileageScreen = false;
    this.showEndMileageScreen = false;
  }
}
