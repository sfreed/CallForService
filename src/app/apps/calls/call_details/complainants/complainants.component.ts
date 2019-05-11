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
  activeCall: CallForService;

  namePrefix: NamePrefix[];
  nameSuffix: NameSuffix[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveCall.bind(this)
  };

  constructor(public callService: CallsService, private personLookupService: PersonLookupService) {
    this.callService.callEmitter.subscribe(
      (data: CallForService) => {
        this.activeCall = data;

        if (!data.complainantPerson) {
          this.activeCall.complainantPerson = new ComplainantPerson();
        }

        console.log('complainant', this.activeCall.complainantPerson);
      });
   }

  ngOnInit() {
    this.activeCall = this.callService.getActiveCall();

    if (!this.activeCall.complainantPerson) {
      this.activeCall.complainantPerson = new ComplainantPerson();
    }

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

  saveCall(e) {
    this.callService.saveCall(this.activeCall);
  }
}
