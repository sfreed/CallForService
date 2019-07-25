import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/callForService/CallForServiceLookup.service';
import DataSource from 'devextreme/data/data_source';
import { InvolvedUnitsItem } from 'src/app/common/models/callDetails/InvolvedUnitItem';
import { CallForServiceUnitType } from 'src/app/common/models/lookups/callForService/CallForServiceUnitType';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import * as deepmerge from 'deepmerge';
import { CommonService } from 'src/app/common/services/common/Common.service';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { UnitService } from 'src/app/common/services/units/Unit.service';
import { DatePipe } from '@angular/common';
import { UnitTimes } from 'src/app/common/models/units/UnitTimes';
import { AvailableUnit } from 'src/app/common/models/units/AvailableUnit';
import { AdminService } from 'src/app/common/services/common/Admin.service';

@Component({
  selector: 'app-involved-units',
  templateUrl: './involved_units.component.html',
  styleUrls: ['./involved_units.component.css']
})
export class InvolvedUnitsComponent implements OnInit {
  @ViewChild('unitContainer') unitContainer: DxDataGridComponent;

  adminFormEmitter: any;

  unitType: DataSource;
  unitAgencies: DataSource;

  involvedUnitsList: DataSource;

  constructor(public callService: CallsService, private cfsLookupService: CallForServiceLookupService, public adminService: AdminService,
    private involvedUnitService: InvolvedUnitsService, private commonService: CommonService, private unitService: UnitService, private datePipe: DatePipe) {
      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.involvedUnitsList = involvedUnitService.getInvolvedUnitList();
      });

      this.adminFormEmitter = adminService.adminFormEmitter;
    }

  ngOnInit() {
    this.unitType = this.unitService.getUnitTypeList();
    this.unitAgencies = this.commonService.getAgencyList();
    this.involvedUnitsList = this.involvedUnitService.getInvolvedUnitList();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }

    if (event.item.element.nativeElement.classList.contains('OFFICER')) {
      const unit: AvailableUnit = event.item.data;

      if (unit.currentCall && unit.currentCall > 0) {
        notify({
            message: unit.unitDescription + ' is currently assigned to call ' + unit.currentCall + '. Please set unit back In Service before assigning to a new call.',
            displayTime: 10000,
            type: 'error'
          });

          return;
      }

      this.involvedUnitService.assignUnitToActiveCall(unit).then(results => {
        this.unitContainer.instance.refresh();
        this.adminFormEmitter.emit(['refreshActiveUnitList', true, unit]);
      });
    }
  }

  getUnitDescription(unit: InvolvedUnitsItem): string {
    if (!unit) {
      return;
    }

    return unit.callForServiceUnit.unitDescription + '(' + unit.callForServiceUnit.unitAgencyId + ')';
  }

  updateRow(options) {
    options.newData = deepmerge(options.oldData, options.newData);
  }

  showContextMenu(e) {
    console.log('getting unit types ', this.cfsLookupService.callForServiceUnitTypeList);

    const unitType: CallForServiceUnitType = this.cfsLookupService.callForServiceUnitTypeList.filter(r => r.id === e.row.data.callForServiceUnit.unitType)[0];

    if (e.row.rowType === 'data') {
      e.items = [{
        text: 'Set as Primary',
        onItemClick: this.setAsPrimary.bind(this, e)
      }, {
        text: 'Dispatch',
        onItemClick: this.updateUnitTime.bind(this, e, 'Dispatch'),
        visible: unitType.isDispatchTime
      }, {
        text: 'Enroute',
        onItemClick: this.updateUnitTime.bind(this, e, 'Enroute'),
        visible: unitType.isEnrouteTime
      }, {
        text: 'On Scene',
        onItemClick: this.updateUnitTime.bind(this, e, 'On Scene'),
        visible: unitType.isArrivedTime
      }, {
        text: 'Leave Scene',
        onItemClick: this.updateUnitTime.bind(this, e, 'Leave Scene'),
        visible: unitType.isLeaveSceneTime
      }, {
        text: 'Arrived Station Time',
        onItemClick: this.updateUnitTime.bind(this, e, 'Arrived Station Time'),
        visible: unitType.isArrivedStationTime
      }, {
        text: 'At Patient Time',
        onItemClick: this.updateUnitTime.bind(this, e, 'At Patient Time'),
        visible: unitType.isAtPatientTime
      }, {
        text: 'Extrication Time',
        onItemClick: this.updateUnitTime.bind(this, e, 'Extrication Time'),
        visible: unitType.isExtricationTime
      }, {
        text: 'First Shock Time',
        onItemClick: this.updateUnitTime.bind(this, e, 'First Shock Time'),
        visible: unitType.isFirstShockTime
      }, {
        text: 'In Service Time',
        onItemClick: this.updateUnitTime.bind(this, e, 'In Service Time'),
        visible: unitType.isInServiceTime
      }, {
        text: 'Under Control Time',
        onItemClick: this.updateUnitTime.bind(this, e, 'Under Control Time'),
        visible: unitType.isUnderControlTime
      }];
    }
  }

  setAsPrimary(data) {
    const unit: InvolvedUnitsItem = data.row.data;
    unit.isPrimaryUnit = true;

    this.involvedUnitService.updateUnit(unit);
  }

  updateUnitTime(data, action) {
    const unit: InvolvedUnitsItem = data.row.data;
    const time = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');

    const unitTime: UnitTimes = new UnitTimes();

    unitTime.unitDateTime = time;
    unitTime.callForServiceId = data.row.data.callForServiceId;
    unitTime.callForServiceUnitId = data.row.data.callForServiceUnitId;

    if (action === 'Enroute') {
      unit.enrouteDateTime = time;
      unitTime.dateTimeType = 2;
    } else if (action === 'On Scene') {
      unitTime.dateTimeType = 9;
      unit.arrivedDateTime = time;
    } else if (action === 'Leave Scene') {
      unitTime.dateTimeType = 8;
      unit.leaveSceneDateTime = time;
    } else if (action === 'Dispatch') {
      unitTime.dateTimeType = 1;
      unit.dispatchDateTime = time;
    } else if (action === 'Arrived Station Time') {
      unitTime.dateTimeType = 3;
      unit.arrivedStationDateTime = time;
    } else if (action === 'At Patient Time') {
      unitTime.dateTimeType = 4;
      unit.atPatientDateTime = time;
    } else if (action === 'Extrication Time') {
      unitTime.dateTimeType = 6;
      unit.extricationDateTime = time;
    } else if (action === 'First Shock Time') {
      unitTime.dateTimeType = 5;
      unit.firstShockDateTime = time;
    } else if (action === 'In Service Time') {
      unitTime.dateTimeType = 10;
      unit.inserviceDateTime = time;
    } else if (action === 'Under Control Time') {
      unitTime.dateTimeType = 7;
      unit.underControlDateTime = time;
    }

    this.involvedUnitService.updateUnitTime(unitTime).then( results => {
      notify(unit.callForServiceUnit.unitDescription + ' : ' + action + ' : ' + time);

      if (action === 'In Service Time') {
        console.log('emitting refreshActiveUnitList event');
        this.adminFormEmitter.emit(['refreshActiveUnitList', true, unit]);
      }
    });
  }
}
