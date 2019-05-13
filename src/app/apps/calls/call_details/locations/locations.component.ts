import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PatrolArea, County, StreetNameDirection, StreetNameSuffix } from 'src/app/common/models/lookups/LocationLookup';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { StreetDao } from 'src/app/common/dao/types/StreetDao.service';
import DataSource from 'devextreme/data/data_source';
import { CityDao } from 'src/app/common/dao/types/CityDao.service';
import { AddressTypeDao } from 'src/app/common/dao/types/AddressTypeDao.service';
import { ZoneDao } from 'src/app/common/dao/types/ZoneDao.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  citySelectionListDisabled = true;

  addressTypeCodes: DataSource;
  streetNames: DataSource;
  cityCodes: DataSource;
  zoneCodes: DataSource;

  countyCodes: County[];
  streetNamePreDirectionCodes: StreetNameDirection[];
  streetNameSuffixCodes: StreetNameSuffix[];
  patrolAreaCodes: PatrolArea[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveCall.bind(this)
  };

  activeCall: CallForService;

  constructor(public callService: CallsService, private locationLookupService: LocationLookupService, private streetDao: StreetDao, private cityDao: CityDao,
    private addressTypeDao: AddressTypeDao, private zoneDao: ZoneDao) {
    this.callService.callEmitter.subscribe(
      (data: CallForService) => {
        this.activeCall = data;
      });
  }

  ngOnInit() {
    this.activeCall = this.callService.getActiveCall();

    this.streetNames = this.streetDao.getStreetListDS();
    this.cityCodes = this.cityDao.getCityListDS();
    this.addressTypeCodes = this.addressTypeDao.getAddressTypeListDS();
    this.zoneCodes = this.zoneDao.getZoneListDS();

    this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
    this.streetNameSuffixCodes = this.locationLookupService.streetNameSuffixList;
    this.countyCodes = this.locationLookupService.countyList;
    this.patrolAreaCodes = this.locationLookupService.patrolAreaList;
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

  saveCall(e) {
    this.callService.saveCall(this.activeCall);
  }
}