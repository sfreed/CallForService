import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/callForService/CallForServiceLookup.service';
import DataSource from 'devextreme/data/data_source';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import { InvolvedUnitsItem } from 'src/app/common/models/callDetails/InvolvedUnitItem';
import { Agency } from 'src/app/common/models/common/Agency';
import { CallForServiceUnitType } from 'src/app/common/models/lookups/callForService/CallForServiceUnitType';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import * as deepmerge from 'deepmerge';

@Component({
  selector: 'app-involved-units',
  templateUrl: './involved_units.component.html',
  styleUrls: ['./involved_units.component.css']
})
export class InvolvedUnitsComponent implements OnInit {
  unitType: CallForServiceUnitType[];
  unitAgencies: Agency[];

  involvedUnitsList: DataSource;

  constructor(public callService: CallsService, private cfsLookupService: CallForServiceLookupService, private personLookup: PersonLookupService,
    private involvedUnitService: InvolvedUnitsService) {
      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.involvedUnitsList = involvedUnitService.getInvolvedUnitList();
      });
    }

  ngOnInit() {
    this.unitType = this.cfsLookupService.callForServiceUnitTypeList;
    this.unitAgencies = this.personLookup.agencyList;
    this.involvedUnitsList = this.involvedUnitService.getInvolvedUnitList();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }

    if (event.item.element.nativeElement.classList.contains('OFFICER')) {
      const officer = event.item.data;

      this.involvedUnitService.assignUnitToActiveCall(officer);
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
}
