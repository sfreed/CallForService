import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { LocationLookupService } from 'src/app/common/services/lookups/location/LocationLookup.service';
import DataSource from 'devextreme/data/data_source';
import { StreetNameDirection } from 'src/app/common/models/lookups/location/StreetNameDirection';
import { PatrolArea } from 'src/app/common/models/lookups/location/PatrolArea';
import { Street } from 'src/app/common/models/lookups/location/Street';
import { LocationService } from 'src/app/common/services/lookups/location/Location.service';
import { StreetNameSuffix } from 'src/app/common/models/lookups/location/StreetNameSuffix';
import { Location } from 'src/app/common/models/call/Location';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { AdminService } from 'src/app/common/services/common/Admin.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  @ViewChild('primaryStreetName') primaryStreetNameList: DxSelectBoxComponent;
  showWaitIndicator = false;

  addressTypes: DataSource;
  streetNames: DataSource;
  cities: DataSource;
  counties: DataSource;
  zones: DataSource;

  streetNameSuffixs: StreetNameSuffix[];
  streetNameDirections: StreetNameDirection[];
  patrolAreaCodes: PatrolArea[];
  buildings: string[];

  popupVisible = false;

  selectedStreet: Street = new Street();

  buttonSaveCallOptions: any = {
    text: 'Save',
    type: 'normal',
    onClick: this.saveCall.bind(this)
  };

  constructor(public callService: CallsService, private locationLookupService: LocationLookupService, private locationService: LocationService, private adminService: AdminService) {
      this.streetNames = this.locationService.getStreetList();
      this.cities = this.locationService.getCityList();
      this.counties = this.locationService.getCountyList();
      this.addressTypes = this.locationService.getAddressTypeList();
      this.zones = this.locationService.getZoneList();
      this.buildings = ['Building 1', 'Building2', 'Building 3', 'Building 4'];
  }

  ngOnInit() {

    this.patrolAreaCodes = this.locationLookupService.patrolAreaList;
    this.streetNameDirections = this.locationLookupService.streetNameDirectionList;
    this.streetNameSuffixs = this.locationLookupService.streetNameSuffix;
  }

  saveCall() {
    this.showWaitIndicator = true;
    this.callService.saveCall(this.callService.getActiveCall()).then(res => this.showWaitIndicator = false).then(data => {
      this.adminService.callListFormEmitter.emit('refresh');
    });
  }

  addStreet(location: Location) {
    this.selectedStreet = new Street();
    this.popupVisible = true;
  }

  editStreet (location: Location) {
    this.locationService.getStreetList().store().byKey(location.streetId).then(results => {
      this.selectedStreet = results;
      location.streetId = this.selectedStreet.id;
      this.popupVisible = true;
    });
  }

  saveStreet () {
    console.log('updating', this.selectedStreet);
    if (this.selectedStreet.id) {
      this.locationService.getStreetList().store().update(this.selectedStreet.id, this.selectedStreet).then(results => {
        console.log('updated', results);
        this.primaryStreetNameList.instance.repaint();
        // this.callService.getActiveCall().locationPrimary.name = this.getStreetName(results);
        // this.saveCall();
        this.popupVisible = false;
      });
    } else {
      this.locationService.getStreetList().store().insert(this.selectedStreet).then(results => {
        console.log('adding', results);
        this.locationService.getStreetList().reload();
        this.popupVisible = false;
      });
    }
  }

  cancelStreet() {
    this.popupVisible = false;
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
        retVal += e.streetNamePreDirectionDescription + ' ';
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
        retVal += e.streetNamePreDirectionDescription + ' ';
      }

      if (e.streetNamePostDirectionCode) {
        retVal += e.streetNamePostDirectionDescription + ' ';
      }

      return  retVal.trim();
    }
  }
}
