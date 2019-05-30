import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceDetails } from 'src/app/common/models/callDetails/CallForServiceDetail';
import { ContactType, NamePrefix, NameSuffix, Gender, Race, Ethnicity, HairColor, HairType, EyeColor, Eyewear, FacialHair } from 'src/app/common/models/lookups/PersonLookup';
import { CallForServiceHospital } from 'src/app/common/models/lookups/CallForServiceLookup';
import { PatrolArea, County, StreetNameDirection, StreetNameSuffix } from 'src/app/common/models/lookups/LocationLookup';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { InvolvedPersonService } from 'src/app/common/services/involved_person.service';
import DataSource from 'devextreme/data/data_source';
import { StreetDao } from 'src/app/common/dao/types/StreetDao.service';
import { CityDao } from 'src/app/common/dao/types/CityDao.service';
import { AddressTypeDao } from 'src/app/common/dao/types/AddressTypeDao.service';
import { ZoneDao } from 'src/app/common/dao/types/ZoneDao.service';
import { StateDao } from 'src/app/common/dao/types/StateDao.service';

@Component({
  selector: 'app-involved-persons',
  templateUrl: './involved_persons.component.html',
  styleUrls: ['./involved_persons.component.css']
})
export class InvolvedPersonsComponent implements OnInit {
  rules = { 'X': /[02-9]/ };

  involvedPersonsList: DataSource;
  addressTypeCodes: DataSource;
  streetNames: DataSource;
  cityCodes: DataSource;
  zoneCodes: DataSource;
  stateCodes: DataSource;

  contactCodes: ContactType[];
  namePrefixCodes: NamePrefix[];
  lastNameSuffixCodes: NameSuffix[];
  streetNamePreDirectionCodes: StreetNameDirection[];
  streetNameSuffixCodes: StreetNameSuffix[];
  countyCodes: County[];
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
    private locationLookupService: LocationLookupService, private involvedPersonsService: InvolvedPersonService,
    private streetDao: StreetDao, private cityDao: CityDao, private addressTypeDao: AddressTypeDao, private zoneDao: ZoneDao, private stateDao: StateDao) {
      this.streetNames = this.streetDao.getStreetListDS();
      this.cityCodes = this.cityDao.getCityListDS();
      this.addressTypeCodes = this.addressTypeDao.getAddressTypeListDS();
      this.zoneCodes = this.zoneDao.getZoneListDS();
      this.stateCodes = this.stateDao.getStateListDS();

      this.callService.callDetailsEmitter.subscribe((data: CallForServiceDetails) => {
        this.involvedPersonsList = this.involvedPersonsService.getInvolvedPersonList();
      });
    }

    ngOnInit() {
      this.contactCodes = this.personLookupService.contactTypeList;
      this.namePrefixCodes = this.personLookupService.namePrefixList;
      this.lastNameSuffixCodes = this.personLookupService.nameSuffixList;
      this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
      this.streetNameSuffixCodes = this.locationLookupService.streetNameSuffixList;
      this.countyCodes = this.locationLookupService.countyList;
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
}
