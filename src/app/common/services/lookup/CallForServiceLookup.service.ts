import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallForServiceLookup, CallForServiceHospital, CallForServiceOriginated,
         CallForServiceStatus, CallForServiceType, CallForServiceUnitType, CallForServiceDispositionStatus } from '../../models/lookups/CallForServiceLookup';
import { URL } from '../../models/enums/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceLookupService {
  callForServiceHospitalList: CallForServiceHospital[];
  callForServiceOriginatedList: CallForServiceOriginated[];
  callForServiceStatusList: CallForServiceStatus[];
  callForServiceTypeList: CallForServiceType[];
  callForServiceUnitTypeList: CallForServiceUnitType[];
  callForServiceDispositionStatusList: CallForServiceDispositionStatus[];

  constructor(private httpClient: HttpClient) {}

  initialize(): Promise<any> {
    const promise = this.httpClient.get<CallForServiceLookup>(URL.CFS_LOOKUP_SERVICE_ADDRESS)
      .toPromise()
      .then(settings => {
        console.log('CallForService Settings from API: ', settings);
        this.callForServiceHospitalList = settings.callForServiceHospital;
        this.callForServiceOriginatedList = settings.callForServiceOriginated;
        this.callForServiceDispositionStatusList = settings.callForServiceDispositionStatus;
        this.callForServiceStatusList = settings.callForServiceStatus;
        this.callForServiceTypeList = settings.callForServiceType;
        this.callForServiceUnitTypeList = settings.callForServiceUnitType;

        return settings;
      });

      return promise;
  }
}
