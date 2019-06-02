import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { LocationLookupService } from 'src/app/common/services/lookups/LocationLookup.service';
import DataSource from 'devextreme/data/data_source';
import { StreetNameDirection } from 'src/app/common/models/lookups/location/StreetNameDirection';
import { County } from 'src/app/common/models/lookups/location/County';
import { PatrolArea } from 'src/app/common/models/lookups/location/PatrolArea';
import { Street } from 'src/app/common/models/lookups/location/Street';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { LocationService } from 'src/app/common/services/lookups/location/Location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  showWaitIndicator = false;

  addressTypes: DataSource;
  streetNames: DataSource;
  cities: DataSource;
  zones: DataSource;
  streetNameSuffixs: DataSource;

  streetNameDirections: StreetNameDirection[];
  countyCodes: County[];
  patrolAreaCodes: PatrolArea[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveStreet.bind(this)
  };

  popupVisible = false;

  selectedStreet: Street = new Street();

  constructor(public callService: CallsService, private locationLookupService: LocationLookupService, private locationService: LocationService,
     private involvedUnitService: InvolvedUnitsService) {
      this.streetNames = this.locationService.getStreetList();
      this.cities = this.locationService.getCityList();
      this.addressTypes = this.locationService.getAddressTypeList();
      this.zones = this.locationService.getZoneList();
      this.streetNameSuffixs = this.locationService.getStreetSuffixList();
  }

  ngOnInit() {
    this.countyCodes = this.locationLookupService.countyList;
    this.patrolAreaCodes = this.locationLookupService.patrolAreaList;
    this.streetNameDirections = this.locationLookupService.streetNameDirectionList;
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }

    if (event.item.element.nativeElement.classList.contains('OFFICER')) {
      const officer = event.item.data;

      this.involvedUnitService.assignUnitToActiveCall(officer);
    }
  }

  saveCall(e) {
    this.showWaitIndicator = true;
    this.callService.saveCall(this.callService.getActiveCall()).then(res => this.showWaitIndicator = false);
  }

  addStreet() {
    this.selectedStreet = new Street();
    this.popupVisible = true;
  }

  editStreet () {
    this.locationService.getStreetList().store().byKey(this.callService.getActiveCall().locationPrimary.streetId).then(results => {
      this.selectedStreet = results;
      this.popupVisible = true;
    });
  }

  saveStreet () {
    if (this.selectedStreet.id) {
      this.locationService.getStreetList().store().update(this.selectedStreet.id, this.selectedStreet).then(results => {
        console.log('updating', results);
        this.locationService.getStreetList().reload();
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
