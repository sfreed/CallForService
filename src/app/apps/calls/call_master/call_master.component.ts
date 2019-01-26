import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';
import { CallDetails } from 'src/app/models/CallDetails';
import { DispatcherService } from '../../services/dispatcher.service';
import { Call } from 'src/app/models/Call';

@Component({
  selector: 'app-call-master',
  templateUrl: './call_master.component.html',
  styleUrls: ['./call_master.component.css']
})
export class CallMasterComponent implements OnInit {
  @ViewChild(DxDataGridComponent) callGrid;

  searchCall: CallDetails;

  calls: DataSource;

  dispatchers: DataSource;

  callTypes: DataSource;

  callStatus: DataSource;

  isRowSelected = false;

  window: Window = window;

  callForms: any[];

  buttonOptions: any = {
    text: 'Search',
    type: 'success'
  };

  constructor(public callService: CallsService, public dispatcherService: DispatcherService) {}

  ngOnInit() {
    this.callService.setCallGrid(this.callGrid);

    this.callForms = this.callService.getCallForms();

    this.dispatchers = this.dispatcherService.getDispatcherList();

    this.callTypes = this.callService.getCallTypeList();

    this.callStatus = this.callService.getCallStatusList();

    this.calls = this.callService.getCallList();
  }

  getComplainantName(data: Call) {

    if (data.complainantPerson.isBusiness) {
      return data.complainantPerson.businessName;
    } else {
      return data.complainantPerson.fullName;
    }
  }

  formSelected(e, callForm) {
    console.log('About to Start:', callForm.selectedItem);
  }

  selectionChanged(e) {
    console.log(e.selectedRowsData[0]);
    this.callService.setActiveCall(e.selectedRowsData[0]);
  }
}
