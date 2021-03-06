import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/callForService/CallForServiceLookup.service';
import { CallTypeDAO } from 'src/app/common/dao/lookups/callForService/CallTypeDAO.service';
import DataSource from 'devextreme/data/data_source';
import { CallForServiceOriginated } from 'src/app/common/models/lookups/callForService/CallForServiceOriginated';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { MasterUserService } from 'src/app/common/services/master/MasterUser.service';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/common/services/common/Admin.service';

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

  window: Window = window;

  buttonOptions: any = {
    text: 'Save',
    type: 'normal',
    onClick: this.saveCall.bind(this)
  };

  todayButton: any = {
    text: 'Now',
    onClick: () => {
        this.callService.getActiveCall().receivedDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    }
};

  constructor(public callService: CallsService, private cfsLookupService: CallForServiceLookupService,
    private masterUserService: MasterUserService, private cfsCallTypeDS: CallTypeDAO, private datePipe: DatePipe, private adminService: AdminService) {
      this.callTypes = this.cfsCallTypeDS.getCallTypeListDS();

      this.dispatchers = this.masterUserService.getMasterUserList();
  }

  ngOnInit() {
    this.callOriginated = this.cfsLookupService.callForServiceOriginatedList;
  }

  getComplainantName() {
    return this.callService.getActiveCall().complainantPerson.fullName;
  }

  saveCall(e) {
    this.showWaitIndicator = true;
    this.callService.saveCall(this.callService.getActiveCall()).then(results => {
      this.callService.setActiveCall(results);
      this.showWaitIndicator = false;
      this.adminService.callListFormEmitter.emit('refresh');
    }

    );
  }

  getCFSTypeDisplayValue (item) {
    return item.code + ' - ' + item.description;
  }
}
