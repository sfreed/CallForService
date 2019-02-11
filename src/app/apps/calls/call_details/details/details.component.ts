import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { Call } from 'src/app/common/models/call/Call';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DatasourcesService } from 'src/app/common/datasources/Datasources.service';
import { CallForServiceType, CallForServiceStatus } from 'src/app/common/models/lookups/CallForServiceLookup';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  callTypesList: CallForServiceType[];

  callStatusList: CallForServiceStatus[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success'
  };

  activeCall: Call;

  constructor(public callService: CallsService,  public dispatcherService: DispatcherService, private cfsLookupService: CallForServiceLookupService) {
    this.callService.callEmitter.subscribe(
      (data: Call) => {
        this.activeCall = data;
      });
  }

  ngOnInit() {
    this.callTypesList = this.cfsLookupService.callForServiceTypeList;

    this.callStatusList = this.cfsLookupService.callForServiceStatusList;

    this.activeCall = this.callService.getActiveCall();
  }

  getComplainantName() {
    return this.activeCall.complainantPerson.fullName;
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
