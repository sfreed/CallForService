import { Injectable } from '@angular/core';
import { BaseDAO } from '../../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { VehicleModel } from 'src/app/common/models/lookups/vehicle/VehicleModel';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelDAO  extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getVehicleModel(key);
      },
      load: () => {
          return this.getVehicleModels();
      },
      insert: (model) => {
        return this.addVehicleModel(model);
      },
      update: (key, model) => {
        return this.updateVehicleModel(key, model);
      },
      remove: (key) => {
          return this.deleteVehicleModel(key);
      }
    });
  }

  public getVehicleModelListDS(): DataSource {
    const ds = new DataSource({
      sort: 'makeCodeDescription',
      store: this.store
    });

    return ds;
  }

  private getVehicleModels(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_MODEL_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getVehicleModel(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_MODEL_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addVehicleModel (model: VehicleModel): Promise<any> {
    this.updateModel(model);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_VEHICLE_MODEL_ADDRESS, JSON.stringify(model), this.getHttpOptions()).toPromise();
  }

  private updateVehicleModel (id, model: VehicleModel): Promise<any> {
    this.updateModel(model);

    return this.http.put(URL.CALL_FOR_SERVICE_VEHICLE_MODEL_ADDRESS + '/' + id, JSON.stringify(model), this.getHttpOptions()).toPromise();
  }

  private deleteVehicleModel (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_VEHICLE_MODEL_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: VehicleModel) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
