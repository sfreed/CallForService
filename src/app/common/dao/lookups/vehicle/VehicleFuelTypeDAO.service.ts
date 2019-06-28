import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { VehicleFuelType } from 'src/app/common/models/lookups/vehicle/VehicleFuelType';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VehicleFuelTypeDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getVehicleFuelType(key);
      },
      load: () => {
          return this.getVehicleFuelTypes();
      },
      insert: (fuelType) => {
        return this.addVehicleFuelType(fuelType);
      },
      update: (key, fuelType) => {
        return this.updateVehicleFuelType(key, fuelType);
      },
      remove: (key) => {
          return this.deleteVehicleFuelType(key);
      }
    });
  }

  public getVehicleFuelTypeListDS(): DataSource {
    const ds = new DataSource({
      sort: 'cityName',
      store: this.store
    });

    return ds;
  }

  private getVehicleFuelTypes(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_FUEL_TYPE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getVehicleFuelType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_FUEL_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addVehicleFuelType (fuelType: VehicleFuelType): Promise<any> {
    this.updateModel(fuelType);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_VEHICLE_FUEL_TYPE_ADDRESS, JSON.stringify(fuelType), this.getHttpOptions()).toPromise();
  }

  private updateVehicleFuelType (id, fuelType: VehicleFuelType): Promise<any> {
    this.updateModel(fuelType);

    return this.http.put(URL.CALL_FOR_SERVICE_VEHICLE_FUEL_TYPE_ADDRESS + '/' + id, JSON.stringify(fuelType), this.getHttpOptions()).toPromise();
  }

  private deleteVehicleFuelType (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_VEHICLE_FUEL_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: VehicleFuelType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
