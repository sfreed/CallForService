import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../../models/common/URL.enum';
import { WreckerService } from '../../../models/callDetails/vehicle/WreckerService';
import { WreckerRotation } from '../../../models/callDetails/vehicle/WreckerRotation';
import { CallForServiceHospital } from '../../../models/lookups/callForService/CallForServiceHospital';
import { CallForServiceOriginated } from '../../../models/lookups/callForService/CallForServiceOriginated';
import { CallForServiceType } from '../../../models/lookups/callForService/CallForServiceType';
import { CallForServiceUnitType } from '../../../models/lookups/callForService/CallForServiceUnitType';
import { CallForServiceLookup } from '../../../models/lookups/callForService/CallForServiceLookup';
import { CallForServiceDispositionStatus } from '../../../models/lookups/callForService/CallForServiceDispositionStatus';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceLookupService {
  callForServiceHospitalList: CallForServiceHospital[];
  callForServiceOriginatedList: CallForServiceOriginated[];
  callForServiceOriginated: CallForServiceOriginated[];
  callForServiceUnitTypeList: CallForServiceUnitType[];
  callForServiceDispositionStatusList: CallForServiceDispositionStatus[];
  wreckerService: WreckerService[];
  wreckerRotation: WreckerRotation[];

  constructor(private httpClient: HttpClient) {}

  initialize(): Promise<CallForServiceLookup> {
    const promise = this.httpClient.get<CallForServiceLookup>(URL.CFS_LOOKUP_SERVICE_ADDRESS, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('id_token')
      })
    })
      .toPromise()
      .then(settings => {
        console.log('CallForService Settings from API: ', settings);
        this.callForServiceHospitalList = settings.callForServiceHospital;
        this.callForServiceOriginatedList = settings.callForServiceOriginated;
        this.callForServiceDispositionStatusList = settings.callForServiceDispositionStatus;
        this.callForServiceOriginated = settings.callForServiceOriginated;
        this.callForServiceUnitTypeList = settings.callForServiceUnitType;
        this.wreckerService = settings.wreckerService;
        this.wreckerRotation = settings.wreckerRotation;

        return settings;
      });

      return promise;
  }
}
