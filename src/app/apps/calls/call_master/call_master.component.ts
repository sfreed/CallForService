import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/callForService/CallForServiceLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookups/vehicle/VehicleLookup.service';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { CallTypeDAO } from 'src/app/common/dao/lookups/callForService/CallTypeDAO.service';
import { CallForServiceOriginated } from 'src/app/common/models/lookups/callForService/CallForServiceOriginated';
import { CallForServiceDispositionStatus } from 'src/app/common/models/lookups/callForService/CallForServiceDispositionStatus';
import { MasterUserService } from 'src/app/common/services/master/MasterUser.service';
import { Street } from 'src/app/common/models/lookups/location/Street';
import { LocationService } from 'src/app/common/services/lookups/location/Location.service';
import { County } from 'src/app/common/models/lookups/location/County';
import { LocationLookupService } from 'src/app/common/services/lookups/location/LocationLookup.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

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
  counties: County[];

  calls: DataSource;
  dispatchers: DataSource;
  callTypes: DataSource;
  addressTypes: DataSource;
  streetNames: DataSource;
  cities: DataSource;
  zoneCodes: DataSource;

  isRowSelected = false;

  window: Window = window;

  addCallPopupVisible = false;

  addStreetPopUpVisible = false;

  selectedStreet: Street = new Street();

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.launchCall.bind(this)
  };

  constructor(public callService: CallsService, private personLookupService: PersonLookupService,
    private cfsLookupService: CallForServiceLookupService, private vehicleLookupService: VehicleLookupService, private locationService: LocationService,
    public authService: AuthenticationService, public cfsCallTypeDao: CallTypeDAO, private masterUserService: MasterUserService,
    private locationLookupService: LocationLookupService, private _hotkeysService: HotkeysService) {
      this.callTypes = this.cfsCallTypeDao.getCallTypeListDS();
      this.dispatchers = this.masterUserService.getMasterUserList();
      this.streetNames = this.locationService.getStreetList();
      this.cities = this.locationService.getCityList();
      this.addressTypes = this.locationService.getAddressTypeList();
      this.zoneCodes = this.locationService.getZoneList();

      this.counties = this.locationLookupService.countyList;

      this._hotkeysService.add(new Hotkey('ctrl+alt+n', (event: KeyboardEvent): boolean => {
        this.startCall();
        return false; // Prevent bubbling
    }));
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
    this.addCallPopupVisible = true;
  }

  launchCall() {
    this.callService.startNewCall(this.newCall).then(response => {
      this.addCallPopupVisible = false;
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

  addStreet() {
    this.selectedStreet = new Street();
    this.addStreetPopUpVisible = true;
  }

  editStreet () {
    this.locationService.getStreetList().store().byKey(this.callService.getActiveCall().locationPrimary.streetId).then(results => {
      this.selectedStreet = results;
      this.addStreetPopUpVisible = true;
    });
  }

  saveStreet () {
    if (this.selectedStreet.id) {
      this.locationService.getStreetList().store().update(this.selectedStreet.id, this.selectedStreet).then(results => {
        console.log('updating', results);
        this.locationService.getStreetList().reload();
        this.addStreetPopUpVisible = false;
      });
    } else {
      this.locationService.getStreetList().store().insert(this.selectedStreet).then(results => {
        console.log('adding', results);
        this.locationService.getStreetList().reload();
        this.addStreetPopUpVisible = false;
      });
    }
  }

  getCityName(e) {
    if (e) {
      return e.cityName + ', ' + e.stateCode;
    }
  }

  getStreetName(e: Street) {
    if (e) {
      let retVal = '';

      if (e.streetNamePreDirectionCode) {
        retVal += e.streetNamePreDirectionCode + ' ';
      }

      if (e.streetNamePreModifier) {
        retVal += e.streetNamePreModifier + ' ';
      }

      if (e.streetName) {
        retVal += e.streetName + ' ';
      }

      if (e.streetNameSuffixDescription) {
        retVal += e.streetNameSuffixDescription + ' ';
      }

      if (e.streetNamePostModifier) {
        retVal += e.streetNamePostModifier + ' ';
      }

      if (e.streetNamePostDirectionCode) {
        retVal += e.streetNamePostDirectionCode + ' ';
      }

      return  retVal.trim();
    }
  }
}
