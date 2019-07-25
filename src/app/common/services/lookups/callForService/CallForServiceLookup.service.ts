import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../../models/common/URL.enum';
import { WreckerService } from '../../../models/callDetails/vehicle/WreckerService';
import { WreckerRotation } from '../../../models/callDetails/vehicle/WreckerRotation';
import { CallForServiceHospital } from '../../../models/common/CallForServiceHospital';
import { CallForServiceOriginated } from '../../../models/lookups/callForService/CallForServiceOriginated';
import { CallForServiceUnitType } from '../../../models/lookups/callForService/CallForServiceUnitType';
import { CallForServiceLookup } from '../../../models/lookups/callForService/CallForServiceLookup';
import { CallForServiceDispositionStatus } from '../../../models/lookups/callForService/CallForServiceDispositionStatus';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceLookupService {
  callForServiceHospitalList: CallForServiceHospital[];
  callForServiceOriginatedList: CallForServiceOriginated[];
  callForServiceOriginated: CallForServiceOriginated[];
  callForServiceUnitTypeList: CallForServiceUnitType[];
  callForServiceDispositionStatusList: CallForServiceDispositionStatus[];


  constructor(private httpClient: HttpClient) {}

  initialize(): Promise<any> {
    const params: any = {
      client_id: environment.CLIENT_ID,
      grant_type: environment.GRANT_TYPE,
      username: environment.TOKEN_USER_NAME,
      password: environment.TOKEN_PASSWORD
    };

    const body: string = this.encodeParams(params);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post(URL.TOKEN_ENDPOINT, body, { headers: headers })
      .toPromise()
      .then(settings => {
          const responseBody: any = settings;

          if (typeof responseBody.access_token !== 'undefined') {
            localStorage.setItem('id_token', responseBody.access_token);
          }

          this.httpClient.get<CallForServiceLookup>(URL.CFS_LOOKUP_SERVICE_ADDRESS, {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'bearer ' + localStorage.getItem('id_token')
            })
            })
            .toPromise()
            .then(resp => {
              console.log('CallForService Settings from API: ', resp);
              this.callForServiceHospitalList = resp.callForServiceHospital;
              this.callForServiceOriginatedList = resp.callForServiceOriginated;
              this.callForServiceDispositionStatusList = resp.callForServiceDispositionStatus;
              this.callForServiceOriginated = resp.callForServiceOriginated;
              this.callForServiceUnitTypeList = resp.callForServiceUnitType;

              return resp;
            });
        }
      );
  }

      /**
     * // Encodes the parameters.
     *
     * @param params The parameters to be encoded
     * @return The encoded parameters
     */
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
