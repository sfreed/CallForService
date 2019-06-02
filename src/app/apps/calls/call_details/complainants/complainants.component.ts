import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { PersonService } from 'src/app/common/services/lookups/person/Person.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-complainants',
  templateUrl: './complainants.component.html',
  styleUrls: ['./complainants.component.css']
})
export class ComplainantsComponent implements OnInit {
  rules = { 'X': /[02-9]/ };

  showWaitIndicator = false;

  namePrefix: DataSource;
  nameSuffix: DataSource;

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveCall.bind(this)
  };

  constructor(public callService: CallsService, private personLookupService: PersonLookupService, private personService: PersonService, private involvedUnitService: InvolvedUnitsService) {}

  ngOnInit() {
    this.namePrefix = this.personService.getNamePrefixList();

    this.nameSuffix = this.personService.getNameSuffixList();
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
