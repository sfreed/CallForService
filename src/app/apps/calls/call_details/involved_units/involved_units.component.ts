import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/callForService/CallForServiceLookup.service';
import DataSource from 'devextreme/data/data_source';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import { InvolvedUnitsItem } from 'src/app/common/models/callDetails/InvolvedUnitItem';
import { CallForServiceUnitType } from 'src/app/common/models/lookups/callForService/CallForServiceUnitType';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import * as deepmerge from 'deepmerge';
import { CommonService } from 'src/app/common/services/common/Common.service';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-involved-units',
  templateUrl: './involved_units.component.html',
  styleUrls: ['./involved_units.component.css']
})
export class InvolvedUnitsComponent implements OnInit {
  @ViewChild('unitContainer') unitContainer: DxDataGridComponent;

  unitType: CallForServiceUnitType[];
  unitAgencies: DataSource;

  involvedUnitsList: DataSource;

  constructor(public callService: CallsService, private cfsLookupService: CallForServiceLookupService, private personLookup: PersonLookupService,
    private involvedUnitService: InvolvedUnitsService, private commonService: CommonService) {
      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.involvedUnitsList = involvedUnitService.getInvolvedUnitList();
      });
    }

  ngOnInit() {
    this.unitType = this.cfsLookupService.callForServiceUnitTypeList;
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
    if (e.row.rowType === 'data') {
      e.items = [{
        text: 'Enroute',
        onItemClick: this.updateUnitTime.bind(this, e, 'Enroute')
      }, {
        text: 'On Scene',
        onItemClick: this.updateUnitTime.bind(this, e, 'On Scene')
      }, {
        text: 'Leave Scene',
        onItemClick: this.updateUnitTime.bind(this, e, 'Leave Scene')
      }];
    }
  }

  updateUnitTime(data, action) {
    const unit: InvolvedUnitsItem = data.row.data;

    const time = new Date().toDateString();
    if (action === 'Enroute') {
      unit.enrouteDateTime = time;
    } else if (action === 'On Scene') {
      unit.arrivedDateTime = time;
    } else if (action === 'Leave Scene') {
      unit.leaveSceneDateTime = time;
    }

    this.involvedUnitService.updateUnitTime(unit);
    notify(unit.callForServiceUnit.unitDescription + ' : ' + action + ' : ' + time);
  }
}
