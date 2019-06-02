import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { VehicleStyle } from 'src/app/common/models/lookups/vehicle/VehicleStyle';

@Injectable({
  providedIn: 'root'
})
export class VehicleStyleDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getVehicleStyle(key);
      },
      load: () => {
          return this.VehicleStyle();
      },
      insert: (callType) => {
        return this.addVehicleStyle(callType);
      },
      update: (key, callType) => {
        return this.updateVehicleStyle(key, callType);
      },
      remove: (key) => {
          return this.deleteVehicleStyle(key);
      }
    });
  }

  public getVehicleStyleListDS(): DataSource {
    const ds = new DataSource({
      sort: 'cityName',
      store: this.store
    });

    return ds;
  }

  private VehicleStyle(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_STYLE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getVehicleStyle(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_STYLE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addVehicleStyle (call: VehicleStyle): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_VEHICLE_STYLE_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private updateVehicleStyle (id, call: VehicleStyle): Promise<any> {
    this.updateModel(call);

    return this.http.put(URL.CALL_FOR_SERVICE_VEHICLE_STYLE_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private deleteVehicleStyle (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_CITY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: VehicleStyle) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
