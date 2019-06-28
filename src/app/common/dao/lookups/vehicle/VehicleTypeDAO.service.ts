import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { VehicleType } from 'src/app/common/models/lookups/vehicle/VehicleType';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getVehicleType(key);
      },
      load: () => {
          return this.getVehicleTypes();
      },
      insert: (type) => {
        return this.addVehicleType(type);
      },
      update: (key, type) => {
        return this.updateVehicleType(key, type);
      },
      remove: (key) => {
          return this.deleteVehicleType(key);
      }
    });
  }

  public getVehicleTypeListDS(): DataSource {
    const ds = new DataSource({
      sort: 'cityName',
      store: this.store
    });

    return ds;
  }

  private getVehicleTypes(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_TYPE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getVehicleType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_VEHICLE_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addVehicleType (type: VehicleType): Promise<any> {
    this.updateModel(type);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_VEHICLE_TYPE_ADDRESS, JSON.stringify(type), this.getHttpOptions()).toPromise();
  }

  private updateVehicleType (id, type: VehicleType): Promise<any> {
    this.updateModel(type);

    return this.http.put(URL.CALL_FOR_SERVICE_VEHICLE_TYPE_ADDRESS + '/' + id, JSON.stringify(type), this.getHttpOptions()).toPromise();
  }

  private deleteVehicleType (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_VEHICLE_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: VehicleType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
