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

  initializeApp() {
    this.locationLookupService.initialize();
    this.vehicleLookupService.initialize();
    this.personLookupService.initialize();
    // this.cfsLookupService.initialize();
  }
}
