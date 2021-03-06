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
import { StreetNameSuffix } from 'src/app/common/models/lookups/location/StreetNameSuffix';
import { StreetNameDirection } from 'src/app/common/models/lookups/location/StreetNameDirection';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/common/services/common/Admin.service';
import { ComplainantService } from 'src/app/common/services/callDetails/Complainant.service';

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
  streetNameSuffixs: StreetNameSuffix[];
  streetNameDirections: StreetNameDirection[];

  calls: DataSource;
  dispatchers: DataSource;
  callTypes: DataSource;
  addressTypes: DataSource;
  streetNames: DataSource;
  cities: DataSource;
  zoneCodes: DataSource;


  window: Window = window;

  addCallPopupVisible = false;

  addStreetPopUpVisible = false;

  searchPopUpVisible = false;

  mapPopupVisible = false;

  selectedStreet: Street = new Street();

  callSet = 'My Active Calls';

  buttonOptionSearch: any =  {
    text: 'Search',
    type: 'normal',
    onClick: this.searchForCall.bind(this)
  };

  constructor(public callService: CallsService, private personLookupService: PersonLookupService,
    private cfsLookupService: CallForServiceLookupService, private vehicleLookupService: VehicleLookupService, private locationService: LocationService,
    public authService: AuthenticationService, public cfsCallTypeDao: CallTypeDAO, private masterUserService: MasterUserService, private datePipe: DatePipe,
    private locationLookupService: LocationLookupService, private _hotkeysService: HotkeysService, private adminService: AdminService, private complainantService: ComplainantService) {
      this.callTypes = this.cfsCallTypeDao.getCallTypeListDS();
      this.dispatchers = this.masterUserService.getMasterUserList();
      this.streetNames = this.locationService.getStreetList();
      this.cities = this.locationService.getCityList();
      this.addressTypes = this.locationService.getAddressTypeList();
      this.zoneCodes = this.locationService.getZoneList();

      this._hotkeysService.add(new Hotkey('ctrl+alt+n', (event: KeyboardEvent): boolean => {
        this.startCall();
        return false; // Prevent bubbling
      }));

      this.adminService.callListFormEmitter.subscribe(data => {
        console.log('received ' + data);
          if (data === 'refresh') {
            console.log('refreshing', this.dataGrid.instance.getRowIndexByKey(this.dataGrid.selectedRowKeys));

            this.dataGrid.instance.repaint();
          }
        });
    }

  ngOnInit() {

      this.personLookupService.initialize().then(people => {
        this.vehicleLookupService.initialize().then(vehicles => {
          this.locationLookupService.initialize().then(location => {
            this.callOriginated = this.cfsLookupService.callForServiceOriginatedList;

            this.callDispositionStatus = this.cfsLookupService.callForServiceDispositionStatusList;

            this.counties = this.locationLookupService.countyList;
            this.streetNameDirections = this.locationLookupService.streetNameDirectionList;
            this.streetNameSuffixs = this.locationLookupService.streetNameSuffix;

            this.filterCalls('dispatcherId', this.authService.getUser().personId);
          });
        });
      });
  }

  showSearchScreen() {
    this.searchPopUpVisible = true;
  }

  cancelSearchScreen() {
    this.searchPopUpVisible = false;
  }

  searchForCall() {

  }

  startCall() {
    this.newCall = new CallForService();
    this.newCall.dispatchedByPerson = this.authService.getUser();
    this.newCall.receivedDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    this.addCallPopupVisible = true;
  }

  launchNewCall() {
    console.log('saving new call', this.newCall);

    this.callService.startNewCall(this.newCall).then(response => {
      console.log('started new call', response);
      console.log('checking for call', this.callService.getActiveCall());
      this.newCall.complainantPerson.callForServiceId = this.callService.getActiveCall().id;

      console.log('saving complainant', this.newCall.complainantPerson);
      this.complainantService.getComplainantsList().store().insert(this.newCall.complainantPerson).then(result => {
        console.log('complainant saved', result);
        this.dataGrid.instance.refresh().then(res => {
          this.dataGrid.focusedRowIndex = 0;
          this.dataGrid.instance.selectRowsByIndexes([0]);
          this.addCallPopupVisible = false;
        });
      });
    });
  }

  cancelNewCall() {
    this.addCallPopupVisible = false;
  }

  selectionChanged(e) {
    this.callService.setActiveCall(e.row.data);
  }

  showColumnChooser () {
   this.dataGrid.instance.showColumnChooser();
  }

  getMyCalls() {
    this.callSet = 'My Calls';
    this.filterCalls('dispatcherId', this.authService.getUser().personId);
  }

  getActiveCalls() {
    this.callSet = 'Active Calls';
    this.filterCalls('callStatus', 1);
  }

  getCallsByDispatcher(data) {
    this.callSet = 'Calls By Dispatcher';
    this.filterCalls('dispatcherId', data.value);
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
      return [item.complainantPerson[0].firstName, item.complainantPerson[0].middleName, item.complainantPerson[0].lastName].join(' ');
    }
  }

  now() {
    return this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

  addStreet() {
    this.selectedStreet = new Street();
    this.addStreetPopUpVisible = true;
  }

  editStreet () {
    this.locationService.getStreetList().store().byKey(this.newCall.locationPrimary.streetId).then(results => {
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

  cancelStreet() {
    this.addStreetPopUpVisible = false;
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

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        width: 136,
        text: 'New Call',
        onClick: this.startCall.bind(this)
      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Active Calls',
        onClick: this.getActiveCalls.bind(this)
      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'My Calls',
        onClick: this.getMyCalls.bind(this)
      }
    }, {
      location: 'before',
      widget: 'dxSelectBox',
      options: {
        caption: 'Dispatcher',
        width: 200,
        dataSource: this.dispatchers.store(),
        displayExpr: 'fullName',
        valueExpr: 'personId',
        value: this.authService.getUser().personId,
        onValueChanged: this.getCallsByDispatcher.bind(this)
      }
    }, {
      template: 'callSetTemplate'
    }
    // , {
    //  location: 'after',
    //  widget: 'dxButton',
    //  options: {
    //    icon: 'search',
    //    onClick: this.showSearchScreen.bind(this)
    //  }
    // }
    );
  }

  closeCall() {
    console.log('closing call');
    this.callService.closeCall(this.callService.getActiveCall());
  }
}
