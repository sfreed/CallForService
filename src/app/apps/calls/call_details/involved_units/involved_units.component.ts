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

@Component({
  selector: 'app-involved-units',
  templateUrl: './involved_units.component.html',
  styleUrls: ['./involved_units.component.css']
})
export class InvolvedUnitsComponent implements OnInit {
  @ViewChild('unitContainer') unitContainer: DxDataGridComponent;

  unitType: DataSource;
  unitAgencies: DataSource;

  involvedUnitsList: DataSource;

  constructor(public callService: CallsService, private cfsLookupService: CallForServiceLookupService,
    private involvedUnitService: InvolvedUnitsService, private commonService: CommonService, private unitService: UnitService, private datePipe: DatePipe) {
      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.involvedUnitsList = involvedUnitService.getInvolvedUnitList();
      });
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
      const officer = event.item.data;

      this.involvedUnitService.assignUnitToActiveCall(officer).then(results => {
        this.unitContainer.instance.refresh();
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

  updateUnitTime(data, action) {
    const unit: InvolvedUnitsItem = data.row.data;

    const time = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    if (action === 'Enroute') {
      unit.enrouteDateTime = time;
    } else if (action === 'On Scene') {
      unit.arrivedDateTime = time;
    } else if (action === 'Leave Scene') {
      unit.leaveSceneDateTime = time;
    } else if (action === 'Dispatch') {
      unit.dispatchDateTime = time;
    } else if (action === 'Arrived Station Time') {
      unit.arrivedStationDateTime = time;
    } else if (action === 'At Patient Time') {
      unit.atPatientDateTime = time;
    } else if (action === 'Extrication Time') {
      unit.extricationDateTime = time;
    } else if (action === 'First Shock Time') {
      unit.firstShockDateTime = time;
    } else if (action === 'In Service Time') {
      unit.inserviceDateTime = time;
    } else if (action === 'Under Control Time') {
      unit.underControlDateTime = time;
    }

    this.involvedUnitService.updateUnitTime(unit);
    notify(unit.callForServiceUnit.unitDescription + ' : ' + action + ' : ' + time);
  }
}
