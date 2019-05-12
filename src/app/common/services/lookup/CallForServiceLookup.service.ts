import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CallForServiceLookup, CallForServiceHospital, CallForServiceOriginated,
         CallForServiceType, CallForServiceUnitType, CallForServiceDispositionStatus } from '../../models/lookups/CallForServiceLookup';
import { URL } from '../../models/enums/URL.enum';
import { WreckerService } from '../../models/callDetails/WreckerService';
import { WreckerRotation } from '../../models/callDetails/WreckerRotation';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceLookupService {
  callForServiceHospitalList: CallForServiceHospital[];
  callForServiceOriginatedList: CallForServiceOriginated[];
  callForServiceOriginated: CallForServiceOriginated[];
  callForServiceTypeList: CallForServiceType[];
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
        this.callForServiceTypeList = settings.callForServiceType;
        this.callForServiceUnitTypeList = settings.callForServiceUnitType;
        this.wreckerService = settings.wreckerService;
        this.wreckerRotation = settings.wreckerRotation;

        return settings;
      });

      return promise;
  }
}
