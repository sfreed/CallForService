import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  streetNameSuffixList: StreetNameSuffix[];
  zoneList: Zone[];

  CLIENT_ID = 'CFSClient';
  GRANT_TYPE = 'password';
  TOKEN_USER_NAME = 'applications@courtware.net';
  TOKEN_PASSWORD = 'Courtware@Tz1pbX0JLYLki';

  constructor(private httpClient: HttpClient) {}

  initialize(): Promise<LocationLookup> {
    const body: string = this.encodeParams({
      client_id: this.CLIENT_ID,
      grant_type: this.GRANT_TYPE,
      username: this.TOKEN_USER_NAME,
      password: this.TOKEN_PASSWORD
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post(URL.TOKEN_ENDPOINT, body, { headers: headers })
      .toPromise()
      .then(token => {
          const responseBody: any = token;

          if (typeof responseBody.access_token !== 'undefined') {
            console.log('storing ' + responseBody.access_token);
            localStorage.setItem('id_token', responseBody.access_token);
          }

          return this.httpClient.get<LocationLookup>(URL.LOCATION_LOOKUP_SERVICE_ADDRESS)
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
              this.streetNameSuffixList = settings.streetNameSuffix;
              this.zoneList = settings.zone;
              return settings;
            });
        }
      );
  }


  private encodeParams(params: any): string {
    let body = '';

    for (const key in params) {
      if (params) {
        if (body.length) {
            body += '&';
        }
        body += key + '=';
        body += encodeURIComponent(params[key]);
      }
    }

    return body;
}
}
