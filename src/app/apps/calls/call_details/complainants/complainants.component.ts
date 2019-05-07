import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ComplainantPerson } from 'src/app/common/models/call/ComplainantPerson';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { NamePrefix, NameSuffix } from 'src/app/common/models/lookups/PersonLookup';
import { CallForService } from 'src/app/common/models/call/CallForService';

@Component({
  selector: 'app-complainants',
  templateUrl: './complainants.component.html',
  styleUrls: ['./complainants.component.css']
})
export class ComplainantsComponent implements OnInit {
  complainant: ComplainantPerson;

  namePrefix: NamePrefix[];
  nameSuffix: NameSuffix[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success'
  };

  constructor(public callService: CallsService, private personLookupService: PersonLookupService) {
    this.callService.callEmitter.subscribe(
      (data: CallForService) => {
        if (!data.complainantPerson) {
          this.complainant = new ComplainantPerson();
        } else {
          this.complainant = data.complainantPerson;
        }
        console.log('complainant', this.complainant);
      });
   }

  ngOnInit() {
    this.complainant = this.callService.getActiveCall().complainantPerson;

    this.namePrefix = this.personLookupService.namePrefixList;

    this.nameSuffix = this.personLookupService.nameSuffixList;
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
