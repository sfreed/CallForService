import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookup/VehicleLookup.service';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient, private personLookupService: PersonLookupService, private cfsLookupService: CallForServiceLookupService,
    private vehicleLookupService: VehicleLookupService, private locationLookupService: LocationLookupService) { }

    initializeApp(): Promise<any> {
      return new Promise((resolve, reject) => {
        console.log(`initializeApp:: inside promise`);

        setTimeout(() => {
          console.log(`initializeApp:: inside setTimeout`);
          // doing something
          resolve();
        }, 3000);
      });
    }

  getCFSLookups(): Promise<any> {
    return this.cfsLookupService.initialize();
  }

  getPersonLookups(): Promise<any> {
    return this.personLookupService.initialize();
  }

  getVehicleLookups(): Promise<any> {
    return this.vehicleLookupService.initialize();
  }

  getLocationLookups(): Promise<any> {
    return this.locationLookupService.initialize();
  }
}
