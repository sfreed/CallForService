import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import DataSource from 'devextreme/data/data_source';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { Call } from 'src/app/common/models/call/Call';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookup/VehicleLookup.service';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { CallForServiceType, CallForServiceStatus } from 'src/app/common/models/lookups/CallForServiceLookup';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-call-master',
  templateUrl: './call_master.component.html',
  styleUrls: ['./call_master.component.css']
})
export class CallMasterComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  searchCall: Call = new Call();

  calls: DataSource;

  dispatchers: DataSource;

  callTypes: CallForServiceType[];

  callStatus: CallForServiceStatus[];

  isRowSelected = false;

  window: Window = window;

  callForms: any = [{
    id: 0,
    name: 'Traffic Call'
  }, {
    id: 1,
    name: 'Domestic Call'
  }];

  buttonOptions: any = {
    text: 'Search',
    type: 'success'
  };

  constructor(public callService: CallsService, public dispatcherService: DispatcherService, private personLookupService: PersonLookupService,
    private cfsLookupService: CallForServiceLookupService, private vehicleLookupService: VehicleLookupService, private locationLookupService: LocationLookupService) {}

  ngOnInit() {
    this.dispatchers = this.dispatcherService.getDispatcherList();

    this.callTypes = this.cfsLookupService.callForServiceTypeList;

    this.callStatus = this.cfsLookupService.callForServiceStatusList;

    this.calls = this.callService.getCallList();
  }

  getPrimaryLocation(data: Call) {
    if (!data) {
      return;
    }

    const loc = data.locationPrimary;
    return loc.name;
  }

  getSecondaryLocation(data: Call) {
    if (!data) {
      return;
    }
    const loc = data.secondaryLocationLocation;
    return loc.name;
  }

  formSelected(e: any, callForm: any) {
    console.log('Launching call form', callForm);
  }

  selectionChanged(e) {
    this.callService.setActiveCall(e.selectedRowsData[0]);
  }

  showColumnChooser () {
   this.dataGrid.instance.showColumnChooser();
  }
}
