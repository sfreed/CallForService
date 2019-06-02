import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { VehicleColor } from 'src/app/common/models/lookups/vehicle/VehicleColor';

@Injectable({
  providedIn: 'root'
})
export class VehicleColorDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getVehicleColor(key);
      },
      load: () => {
          return this.VehicleColor();
      },
      insert: (callType) => {
        return this.addVehicleColor(callType);
      },
      update: (key, callType) => {
        return this.updateVehicleColor(key, callType);
      },
      remove: (key) => {
          return this.deleteVehicleColor(key);
      }
    });
  }

  public getVehicleColorListDS(): DataSource {
    const ds = new DataSource({
      sort: 'vehicleColorCodeDescription',
      store: this.store
    });

    return ds;
  }

  private VehicleColor(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_COLOR_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getVehicleColor(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_COLOR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addVehicleColor (call: VehicleColor): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_VEHICLE_COLOR_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private updateVehicleColor (id, call: VehicleColor): Promise<any> {
    this.updateModel(call);

    return this.http.put(URL.CALL_FOR_SERVICE_VEHICLE_COLOR_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private deleteVehicleColor (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_VEHICLE_COLOR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: VehicleColor) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
