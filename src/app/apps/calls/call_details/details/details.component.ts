import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceType, CallForServiceStatus } from 'src/app/common/models/lookups/CallForServiceLookup';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { MasterUserService } from 'src/app/common/services/lookup/MasterUser.service';
import { MasterUser } from 'src/app/common/models/master/MasterUser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  callTypes: CallForServiceType[];

  callStatusList: CallForServiceStatus[];

  dispatchers: MasterUser[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success'
  };

  activeCall: CallForService;

  constructor(public callService: CallsService,  public dispatcherService: DispatcherService, private cfsLookupService: CallForServiceLookupService,
    private masterUserService: MasterUserService) {
    this.callService.callEmitter.subscribe(
      (data: CallForService) => {
        this.activeCall = data;
      });
  }

  ngOnInit() {
    this.callTypes = this.cfsLookupService.callForServiceTypeList;

    this.callStatusList = this.cfsLookupService.callForServiceStatusList;

    this.activeCall = this.callService.getActiveCall();

    this.dispatchers = this.masterUserService.users;
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
