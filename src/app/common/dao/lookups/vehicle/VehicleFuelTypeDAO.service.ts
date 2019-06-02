import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { VehicleFuelType } from 'src/app/common/models/lookups/vehicle/VehicleFuelType';

@Injectable({
  providedIn: 'root'
})
export class VehicleFuelTypeDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getVehicleFuelType(key);
      },
      load: () => {
          return this.VehicleFuelType();
      },
      insert: (callType) => {
        return this.addVehicleFuelType(callType);
      },
      update: (key, callType) => {
        return this.updateVehicleFuelType(key, callType);
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

  private VehicleFuelType(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CITY_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getVehicleFuelType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CITY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addVehicleFuelType (call: VehicleFuelType): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_CITY_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private updateVehicleFuelType (id, call: VehicleFuelType): Promise<any> {
    this.updateModel(call);

    return this.http.put(URL.CALL_FOR_SERVICE_CITY_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private deleteVehicleFuelType (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_CITY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: VehicleFuelType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
