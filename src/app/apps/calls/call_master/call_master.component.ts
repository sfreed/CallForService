import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import DataSource from 'devextreme/data/data_source';
import { DispatcherService } from '../../services/dispatcher.service';
import { Call } from 'src/app/models/call/Call';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-call-master',
  templateUrl: './call_master.component.html',
  styleUrls: ['./call_master.component.css']
})
export class CallMasterComponent implements OnInit {
  searchCall: Call = new Call();

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

  constructor(public callService: CallsService, public dispatcherService: DispatcherService, public listDataService: ListsService) {}

  ngOnInit() {
    this.callForms = this.listDataService.getCallForms();

    this.dispatchers = this.dispatcherService.getDispatcherList();

    this.callTypes = this.listDataService.getCallTypeList();

    this.callStatus = this.listDataService.getCallStatusList();

    this.calls = this.callService.getCallList();
  }

  getComplainantName(data: Call) {
    if (data.complainantPerson.isBusiness) {
      return data.complainantPerson.businessName;
    } else {
      return data.complainantPerson.fullName;
    }
  }

  formSelected(e: any, callForm: any) {
    console.log('Launching call form', callForm);
  }

  selectionChanged(e) {
    this.callService.setActiveCall(e.selectedRowsData[0]);
  }
}
