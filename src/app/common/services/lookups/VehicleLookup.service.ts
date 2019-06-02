import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../models/common/URL.enum';
import { VehicleEngineType } from '../../models/lookups/vehicle/VehicleEngineType';
import { VehicleFuelType } from '../../models/lookups/vehicle/VehicleFuelType';
import { VehicleMake } from '../../models/lookups/vehicle/VehicleMake';
import { VehicleModel } from '../../models/lookups/vehicle/VehicleModel';
import { VehicleStyle } from '../../models/lookups/vehicle/VehicleStyle';
import { VehicleTransmissionType } from '../../models/lookups/vehicle/VehicleTransmissionType';
import { VehicleType } from '../../models/lookups/vehicle/VehicleType';
import { VehicleLookup } from '../../models/lookups/VehicleLookup';

@Injectable({
  providedIn: 'root'
})
export class VehicleLookupService {
  vehicleEngineTypeList: VehicleEngineType[];
  vehicleTransmissionTypeList: VehicleTransmissionType[];


  constructor(private httpClient: HttpClient) {}

  initialize(): Promise<VehicleLookup> {
    const promise = this.httpClient.get<VehicleLookup>(URL.VEHICLE_LOOKUP_SERVICE_ADDRESS, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('id_token')
      })
    })
      .toPromise()
      .then(settings => {
        console.log('Vehicle Settings from API: ', settings);
        this.vehicleEngineTypeList = settings.vehicleEngineType;
        this.vehicleTransmissionTypeList = settings.vehicleTransmissionType;
        return settings;
      });

      return promise;
  }
}
