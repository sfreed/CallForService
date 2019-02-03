import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationLookup, AddressType, Country, County, PatrolArea, Street,
         StreetNameDirection, StreetNameSuffix, Zone, City, State } from '../../models/lookups/LocationLookup';
import { URL } from '../../models/enums/URL.enum';


@Injectable({
  providedIn: 'root'
})
export class LocationLookupService {
  addressTypeList: AddressType[];
  cityList: City[];
  countryList: Country[];
  countyList: County[];
  patrolAreaList: PatrolArea[];
  stateList: State[];
  streetList: Street[];
  streetNameDirectionList: StreetNameDirection[];
  StreetNameSuffixList: StreetNameSuffix[];
  ZoneList: Zone[];

  constructor(private httpClient: HttpClient) {}

  initialize() {
    const promise = this.httpClient.get<LocationLookup>(URL.LOCATION_LOOKUP_SERVICE_ADDRESS)
      .toPromise()
      .then(settings => {
        console.log('Location Settings from API: ', settings);
        this.addressTypeList = settings.addressType;
        this.cityList = settings.city;
        this.countryList = settings.country;
        this.countyList = settings.county;
        this.patrolAreaList = settings.patrolArea;
        this.stateList = settings.state;
        this.streetList = settings.street;
        this.streetNameDirectionList = settings.streetNameDirection;
        this.StreetNameSuffixList = settings.StreetNameSuffix;
        this.ZoneList = settings.Zone;
      });
  }
}
