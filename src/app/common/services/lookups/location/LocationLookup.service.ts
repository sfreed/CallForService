import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationLookup } from '../../../models/lookups/location/LocationLookup';
import { URL } from '../../../models/common/URL.enum';
import { StreetNameDirection } from '../../../models/lookups/location/StreetNameDirection';
import { County } from '../../../models/lookups/location/County';
import { Country } from '../../../models/lookups/location/Country';
import { PatrolArea } from '../../../models/lookups/location/PatrolArea';
import { Zone } from '../../../models/lookups/location/Zone';


@Injectable({
  providedIn: 'root'
})
export class LocationLookupService {
  countryList: Country[];
  countyList: County[];
  patrolAreaList: PatrolArea[];
  streetNameDirectionList: StreetNameDirection[];
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
              this.countryList = settings.country;
              this.countyList = settings.county;
              this.patrolAreaList = settings.patrolArea;
              this.streetNameDirectionList = settings.streetNameDirection;
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
