import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceOriginated } from 'src/app/common/models/lookups/CallForServiceLookup';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { CallTypeDao } from 'src/app/common/dao/types/CallTypeDao.service';
import DataSource from 'devextreme/data/data_source';
import { MasterUserDAO } from 'src/app/common/dao/MasterUserDAO.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  showWaitIndicator = false;

  callOriginated: CallForServiceOriginated[];

  callTypes: DataSource;
  dispatchers: DataSource;

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveCall.bind(this)
  };

  todayButton: any;

  activeCall: CallForService;

  constructor(public callService: CallsService,  public dispatcherService: DispatcherService, private cfsLookupService: CallForServiceLookupService,
    private masterUserDao: MasterUserDAO, private cfsCallTypeDS: CallTypeDao) {
      this.callTypes = this.cfsCallTypeDS.getCallTypeListDS();

      this.dispatchers = this.masterUserDao.getMasterUsersDS();

      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.activeCall = data;
      });

      this.todayButton = {
        text: 'Now',
        onClick: () => {
            this.activeCall.receivedDateTime = new Date().toISOString();
        }
    };
  }

  ngOnInit() {
    this.callOriginated = this.cfsLookupService.callForServiceOriginatedList;
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

  saveCall(e) {
    this.showWaitIndicator = true;
    this.callService.saveCall(this.activeCall).then(res => this.showWaitIndicator = false);
  }

  getCFSTypeDisplayValue (item) {
    return item.code + ' - ' + item.description;
  }
}
