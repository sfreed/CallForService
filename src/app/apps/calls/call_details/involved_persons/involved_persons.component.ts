import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/callForService/CallForServiceLookup.service';
import { LocationLookupService } from 'src/app/common/services/lookups/location/LocationLookup.service';
import { InvolvedPersonService } from 'src/app/common/services/callDetails/InvolvedPerson.service';
import DataSource from 'devextreme/data/data_source';
import { StreetNameDirection } from 'src/app/common/models/lookups/location/StreetNameDirection';
import { Street } from 'src/app/common/models/lookups/location/Street';
import { County } from 'src/app/common/models/lookups/location/County';
import { PatrolArea } from 'src/app/common/models/lookups/location/PatrolArea';
import { Gender } from 'src/app/common/models/lookups/person/Gender';
import { Race } from 'src/app/common/models/lookups/person/Race';
import { EyeColor } from 'src/app/common/models/lookups/person/EyeColor';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { LocationService } from 'src/app/common/services/lookups/location/Location.service';
import * as deepmerge from 'deepmerge';
import { PersonService } from 'src/app/common/services/lookups/person/Person.service';
import { CommonService } from 'src/app/common/services/common/Common.service';


@Component({
  selector: 'app-involved-persons',
  templateUrl: './involved_persons.component.html',
  styleUrls: ['./involved_persons.component.css']
})
export class InvolvedPersonsComponent implements OnInit {
  rules = { 'X': /[02-9]/ };

  involvedPersonsList: DataSource;
  addressTypes: DataSource;
  streetNames: DataSource;
  cities: DataSource;
  zones: DataSource;
  states: DataSource;
  streetNameSuffixs: DataSource;
  contactCodes: DataSource;
  namePrefixCodes: DataSource;
  lastNameSuffixCodes: DataSource;
  ethnicityCodes: DataSource;
  hairColorCodes: DataSource;
  hairTypeCodes: DataSource;
  eyeWearCodes: DataSource;
  facialHairCodes: DataSource;
  hospitalCodes: DataSource;

  streetNamePreDirectionCodes: StreetNameDirection[];
  countyCodes: County[];
  patrolAreaCodes: PatrolArea[];
  genderCodes: Gender[];
  raceCodes: Race[];
  eyeColorCodes: EyeColor[];

  popupVisible = false;

  selectedStreet: Street = new Street();

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveStreet.bind(this)
  };

  constructor(public callService: CallsService, private personLookupService: PersonLookupService, private callForServiceLookup: CallForServiceLookupService,
    private locationService: LocationService, private locationLookupService: LocationLookupService, private involvedPersonsService: InvolvedPersonService,
    private involvedUnitService: InvolvedUnitsService, private personService: PersonService, private commonService: CommonService) {
      this.streetNames = this.locationService.getStreetList();
      this.cities = this.locationService.getCityList();
      this.addressTypes = this.locationService.getAddressTypeList();
      this.zones = this.locationService.getZoneList();
      this.states = this.locationService.getStateList();
      this.streetNameSuffixs = this.locationService.getStreetSuffixList();
      this.contactCodes = this.personService.getContactTypeList();
      this.namePrefixCodes = this.personService.getNamePrefixList();
      this.lastNameSuffixCodes = this.personService.getNameSuffixList();
      this.ethnicityCodes = this.personService.getEthicityList();
      this.hairColorCodes = this.personService.getHairColorList();
      this.hairTypeCodes = this.personService.getHairTypeList();
      this.eyeWearCodes = this.personService.getEyewearList();
      this.facialHairCodes = this.personService.getFacialHairList();
      this.hospitalCodes = this.commonService.getHospitalService();

      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.involvedPersonsList = this.involvedPersonsService.getInvolvedPersonList();
      });
    }

    ngOnInit() {
      this.eyeColorCodes = this.personLookupService.eyeColorList;
      this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
      this.countyCodes = this.locationLookupService.countyList;
      this.patrolAreaCodes = this.locationLookupService.patrolAreaList;
      this.genderCodes = this.personLookupService.genderList;
      this.raceCodes = this.personLookupService.raceList;
      this.involvedPersonsList = this.involvedPersonsService.getInvolvedPersonList();
    }

  assignToHospital() {
    console.log('clicked');
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

      if (e.streetNamePreDirectionDescription) {
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

      if (e.streetNamePostDirectionDescription) {
        retVal += e.streetNamePostDirectionCode + ' ';
      }

      return  retVal.trim();
    }
  }

  updateRow(options) {
    options.newData = deepmerge(options.oldData, options.newData);
  }
}
