import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VehicleLookup, VehicleColor, VehicleEngineType, VehicleFuelType, VehicleMake,
         VehicleModel, VehicleStyle, VehicleTransmissionType, VehicleType } from '../../models/lookups/VehicleLookup';
import { URL } from '../../models/enums/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class VehicleLookupService {
  vehicleColorList: VehicleColor[];
  vehicleEngineTypeList: VehicleEngineType[];
  vehicleFuelTypeList: VehicleFuelType[];
  vehicleMakeList: VehicleMake[];
  vehicleModelList: VehicleModel[];
  vehicleStyleList: VehicleStyle[];
  vehicleTransmissionTypeList: VehicleTransmissionType[];
  vehicleTypeList: VehicleType[];

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
        this.vehicleColorList = settings.vehicleColor;
        this.vehicleEngineTypeList = settings.vehicleEngineType;
        this.vehicleFuelTypeList = settings.vehicleFuelType;
        this.vehicleMakeList = settings.vehicleMake;
        this.vehicleModelList = settings.vehicleModel;
        this.vehicleStyleList = settings.vehicleStyle;
        this.vehicleTransmissionTypeList = settings.vehicleTransmissionType;
        this.vehicleTypeList = settings.vehicleType;
        return settings;
      });

      return promise;
  }
}
