import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceDetails } from 'src/app/common/models/callDetails/CallForServiceDetail';
import { ContactType, NamePrefix, NameSuffix, Gender, Race, Ethnicity, HairColor, HairType, EyeColor, Eyewear, FacialHair } from 'src/app/common/models/lookups/PersonLookup';
import { CallForServiceHospital } from 'src/app/common/models/lookups/CallForServiceLookup';
import { PatrolArea, Zone, City, County, AddressType, Street, StreetNameDirection, StreetNameSuffix, State } from 'src/app/common/models/lookups/LocationLookup';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { InvolvedPersonService } from 'src/app/common/services/involved_person.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-involved-persons',
  templateUrl: './involved_persons.component.html',
  styleUrls: ['./involved_persons.component.css']
})
export class InvolvedPersonsComponent implements OnInit {
  rules: Object;

  involvedPersonsList: DataSource;

  citySelectionListDisabled = true;

  stateEditorBindOptions: Object;


  contactCodes: ContactType[];
  namePrefixCodes: NamePrefix[];
  lastNameSuffixCodes: NameSuffix[];
  addressCodes: AddressType[];
  streetNames: Street[];
  streetNamePreDirectionCodes: StreetNameDirection[];
  streetNameSuffixCodes: StreetNameSuffix[];
  countyCodes: County[];
  cityCodes: City[];
  states: State[];
  zoneCodes: Zone[];
  patrolAreaCodes: PatrolArea[];
  genderCodes: Gender[];
  raceCodes: Race[];
  ethnicityCodes: Ethnicity[];
  hairColorCodes: HairColor[];
  hairCodes: HairType[];
  eyeColorCodes: EyeColor[];
  eyeWearCodes: Eyewear[];
  facialHairCodes: FacialHair[];
  hospitalCodes: CallForServiceHospital[];


  constructor(public callService: CallsService, private personLookupService: PersonLookupService, private callForServiceLookup: CallForServiceLookupService,
    private locationLookupService: LocationLookupService, private involvedPersonsService: InvolvedPersonService, private callsService: CallsService) {
    this.callService.callDetailsEmitter.subscribe(
      (data: CallForServiceDetails) => {

        this.involvedPersonsList = this.involvedPersonsService.getInvolvedPersonList();
      });

      this.rules = { 'X': /[02-9]/ };
  }

  ngOnInit() {
    this.contactCodes = this.personLookupService.contactTypeList;
    this.namePrefixCodes = this.personLookupService.namePrefixList;
    this.lastNameSuffixCodes = this.personLookupService.nameSuffixList;
    this.addressCodes = this.locationLookupService.addressTypeList;
    this.streetNames = this.locationLookupService.streetList;
    this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
    this.streetNameSuffixCodes = this.locationLookupService.streetNameSuffixList;
    this.countyCodes = this.locationLookupService.countyList;
    this.cityCodes = this.locationLookupService.cityList;
    this.states = this.locationLookupService.stateList;
    this.zoneCodes = this.locationLookupService.zoneList;
    this.patrolAreaCodes = this.locationLookupService.patrolAreaList;
    this.genderCodes = this.personLookupService.genderList;
    this.raceCodes = this.personLookupService.raceList;
    this.ethnicityCodes = this.personLookupService.ethnicityList;
    this.hairColorCodes = this.personLookupService.hairColorList;
    this.hairCodes = this.personLookupService.hairTypeList;
    this.eyeColorCodes = this.personLookupService.eyeColorList;
    this.eyeWearCodes = this.personLookupService.eyeWearList;
    this.facialHairCodes = this.personLookupService.facialHairList;
    this.hospitalCodes = this.callForServiceLookup.callForServiceHospitalList;

    this.stateEditorBindOptions = { items: this.states,  valueExpr: 'id', displayExpr: 'stateName', 'onSelectionChanged': this.selectState };
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

      this.callService.assignUnitToActiveCall(officer);
    }

  }

  onSelect(e) {
    console.log('clicked', e);
  }

  selectState(e) {
    console.log('selectState');
    this.citySelectionListDisabled = false;
  }
}
