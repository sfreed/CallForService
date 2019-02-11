import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceUnitType } from 'src/app/common/models/lookups/CallForServiceLookup';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';

@Component({
  selector: 'app-involved-units',
  templateUrl: './involved_units.component.html',
  styleUrls: ['./involved_units.component.css']
})
export class InvolvedUnitsComponent implements OnInit {

  unitType: CallForServiceUnitType[];

  constructor(public callService: CallsService, private cfsLookupService: CallForServiceLookupService) {}

  ngOnInit() {
    this.unitType = this.cfsLookupService.callForServiceUnitTypeList;
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }

    if (event.item.element.nativeElement.classList.contains('OFFICER')) {
      const officer = event.item.data;

      this.callService.assignUnitToActiveCall(officer);
    }

  }
}
