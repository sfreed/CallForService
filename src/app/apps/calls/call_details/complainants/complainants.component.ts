import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ComplainantPerson } from 'src/app/common/models/call/ComplainantPerson';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { NamePrefix } from 'src/app/common/models/lookups/person/NamePrefix';
import { NameSuffix } from 'src/app/common/models/lookups/person/NameSuffix';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';

@Component({
  selector: 'app-complainants',
  templateUrl: './complainants.component.html',
  styleUrls: ['./complainants.component.css']
})
export class ComplainantsComponent implements OnInit {
  rules = { 'X': /[02-9]/ };

  showWaitIndicator = false;

  namePrefix: NamePrefix[];
  nameSuffix: NameSuffix[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveCall.bind(this)
  };

  constructor(public callService: CallsService, private personLookupService: PersonLookupService, private involvedUnitService: InvolvedUnitsService) {}

  ngOnInit() {
    this.namePrefix = this.personLookupService.namePrefixList;

    this.nameSuffix = this.personLookupService.nameSuffixList;
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

  saveCall(e) {
    this.showWaitIndicator = true;
    this.callService.saveCall(this.callService.getActiveCall()).then(res => this.showWaitIndicator = false);
  }
}
