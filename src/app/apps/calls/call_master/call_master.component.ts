import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookup/VehicleLookup.service';
import { CallForServiceDispositionStatus, CallForServiceOriginated } from 'src/app/common/models/lookups/CallForServiceLookup';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { CallTypeDao } from 'src/app/common/dao/types/CallTypeDao.service';
import { MasterUserDAO } from 'src/app/common/dao/MasterUserDAO.service';
import { StreetDao } from 'src/app/common/dao/types/StreetDao.service';
import { AddressTypeDao } from 'src/app/common/dao/types/AddressTypeDao.service';
import { CityDao } from 'src/app/common/dao/types/CityDao.service';
import { ZoneDao } from 'src/app/common/dao/types/ZoneDao.service';


@Component({
  selector: 'app-call-master',
  templateUrl: './call_master.component.html',
  styleUrls: ['./call_master.component.css']
})
export class CallMasterComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  searchCall: CallForService = new CallForService();
  newCall: CallForService;
  callOriginated: CallForServiceOriginated[];
  callDispositionStatus: CallForServiceDispositionStatus[];

  calls: DataSource;
  dispatchers: DataSource;
  callTypes: DataSource;
  addressTypeCodes: DataSource;
  streetNames: DataSource;
  cityCodes: DataSource;
  zoneCodes: DataSource;


  isRowSelected = false;

  window: Window = window;

  popupVisible = false;

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.launchCall.bind(this)
  };

  constructor(public callService: CallsService, public dispatcherService: DispatcherService, private personLookupService: PersonLookupService,
    private cfsLookupService: CallForServiceLookupService, private vehicleLookupService: VehicleLookupService,
    public authService: AuthenticationService, public cfsCallTypeDao: CallTypeDao, private masterUserDao: MasterUserDAO,
    private streetDao: StreetDao, private cityDao: CityDao,
    private addressTypeDao: AddressTypeDao, private zoneDao: ZoneDao) {
      this.callTypes = this.cfsCallTypeDao.getCallTypeListDS();
      this.dispatchers = this.masterUserDao.getMasterUsersDS();
      this.streetNames = this.streetDao.getStreetListDS();
      this.cityCodes = this.cityDao.getCityListDS();
      this.addressTypeCodes = this.addressTypeDao.getAddressTypeListDS();
      this.zoneCodes = this.zoneDao.getZoneListDS();
    }

  ngOnInit() {
    this.cfsLookupService.initialize().then(results => {
      this.personLookupService.initialize().then(people => {
        this.vehicleLookupService.initialize().then(vehicles => {
            this.callOriginated = this.cfsLookupService.callForServiceOriginatedList;

            this.callDispositionStatus = this.cfsLookupService.callForServiceDispositionStatusList;

            this.filterCalls('dispatcherId', this.authService.getUser().personId);
        });
      });
    });
  }

  startCall() {
    this.newCall = new CallForService();
    this.newCall.dispatchedByPerson = this.authService.getUser();
    this.newCall.receivedDateTime = new Date().toISOString();
    this.popupVisible = true;
  }

  launchCall() {
    this.callService.startNewCall(this.newCall).then(response => {
      this.popupVisible = false;
      this.dataGrid.instance.refresh().then(res => {
        this.dataGrid.focusedRowIndex = 0;
        this.dataGrid.instance.selectRowsByIndexes([0]);
      });
    });
  }

  selectionChanged(e) {
    this.callService.setActiveCall(e.row.data);
  }

  showColumnChooser () {
   this.dataGrid.instance.showColumnChooser();
  }

  filterCalls(key, value) {
    this.calls = this.callService.getCallList(key, value);
  }

  getCFSTypeDisplayValue (item) {
    if (item) {
      return item.code + ' - ' + item.description;
    }
  }

  getComplainantDisplayValue (item) {
    if (item.complainantPerson) {
      return item.complainantPerson.firstName + ' ' + item.complainantPerson.lastName;
    }
  }

  now() {
    return new Date().toISOString();
  }
}
