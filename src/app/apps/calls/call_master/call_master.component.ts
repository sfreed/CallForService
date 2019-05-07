import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookup/VehicleLookup.service';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { CallForServiceType, CallForServiceStatus, CallForServiceDispositionStatus } from 'src/app/common/models/lookups/CallForServiceLookup';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { MasterUserLookupService } from 'src/app/common/services/lookup/MasterUserLookup.service';
import { MasterUser } from 'src/app/common/models/master/MasterUser';


@Component({
  selector: 'app-call-master',
  templateUrl: './call_master.component.html',
  styleUrls: ['./call_master.component.css']
})
export class CallMasterComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  searchCall: CallForService = new CallForService();

  calls: DataSource;

  dispatchers: MasterUser[];

  callTypes: CallForServiceType[];

  callStatus: CallForServiceStatus[];

  callDispositionStatus: CallForServiceDispositionStatus[];

  isRowSelected = false;

  window: Window = window;

  buttonOptions: any = {
    text: 'Search',
    type: 'success'
  };

  constructor(public callService: CallsService, public dispatcherService: DispatcherService, private personLookupService: PersonLookupService,
    private cfsLookupService: CallForServiceLookupService, private vehicleLookupService: VehicleLookupService,
    private locationLookupService: LocationLookupService, private masterUserService: MasterUserLookupService) {}

  ngOnInit() {
    this.cfsLookupService.initialize().then(results => {
      this.personLookupService.initialize().then(people => {
        this.vehicleLookupService.initialize().then(vehicles => {
          this.locationLookupService.initialize().then(locations => {
              this.masterUserService.initialize().then (users => {
                this.callTypes = this.cfsLookupService.callForServiceTypeList;

                this.callStatus = this.cfsLookupService.callForServiceStatusList;

                this.callDispositionStatus = this.cfsLookupService.callForServiceDispositionStatusList;

                this.dispatchers = this.masterUserService.users;

                this.calls = this.callService.getCallList(1);
              });
          });
        });
      });
    });
  }

  formSelected(e: any, callForm: any) {
    if (!callForm.selectedItem) {
      return;
    }
    this.callService.startNewCall(callForm.selectedItem);
  }

  selectionChanged(e) {
    this.callService.setActiveCall(e.row.data);
  }

  showColumnChooser () {
   this.dataGrid.instance.showColumnChooser();
  }

  filterCalls(calltatus: number) {
    this.calls = this.callService.getCallList(calltatus);
  }

}
