import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { PersonLookupService } from 'src/app/common/services/lookups/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/CallForServiceLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookups/VehicleLookup.service';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { CallTypeDAO } from 'src/app/common/dao/lookups/callForService/CallTypeDAO.service';
import { MasterUserDAO } from 'src/app/common/dao/master/MasterUserDAO.service';
import { StreetDAO } from 'src/app/common/dao/lookups/location/StreetDAO.service';
import { AddressTypeDAO } from 'src/app/common/dao/lookups/location/AddressTypeDAO.service';
import { CityDAO } from 'src/app/common/dao/lookups/location/CityDAO.service';
import { ZoneDAO } from 'src/app/common/dao/lookups/location/ZoneDAO.service';
import { CallForServiceOriginated } from 'src/app/common/models/lookups/callForService/CallForServiceOriginated';
import { CallForServiceDispositionStatus } from 'src/app/common/models/lookups/callForService/CallForServiceDispositionStatus';
import { MasterUserService } from 'src/app/common/services/master/MasterUser.service';

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
    public authService: AuthenticationService, public cfsCallTypeDao: CallTypeDAO, private masterUserService: MasterUserService,
    private streetDao: StreetDAO, private cityDao: CityDAO, private addressTypeDao: AddressTypeDAO, private zoneDao: ZoneDAO) {
      this.callTypes = this.cfsCallTypeDao.getCallTypeListDS();
      this.dispatchers = this.masterUserService.getMasterUserList();
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

  focusRowSelected(e) {
    console.log('selected', e);
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
      return [item.complainantPerson.firstName, item.complainantPerson.middleName, item.complainantPerson.lastName].join(' ');
    }
  }

  now() {
    return new Date().toISOString();
  }
}
