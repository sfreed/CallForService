import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallsService } from '../../services/call/Calls.service';
import { BaseDAO } from '../BaseDAO';
import { InvolvedVehiclesItem } from '../../models/callDetails/InvolvedVehicleItem';
import { AuthenticationService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvolvedVehicleDAO extends BaseDAO {

  constructor(private http: HttpClient, private callService: CallsService, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'vehicleId',
      byKey: (key) => {
        return this.getInvolvedVehicle(key);
      },
      load: () => {
        return this.getInvolvedVehicles();
      },
      insert: (vehicle) => {
        return this.addInvolvedVehicle(vehicle);
      },
      update: (key, vehicle: InvolvedVehiclesItem) => {
         return this.updateInvolvedVehicle(key, vehicle);
      },
      remove: (key) => {
          return this.deleteInvolvedVehicle(key);
      }
    });
  }

  public getInvolvedVehiclesDS(): DataSource {
    const ds = new DataSource({
      store: this.store
    });

    return ds;
  }

  private getInvolvedVehicles(): Promise<any> {
    return this.http.get<any>(this.endpoint + 'CallForServiceInvolvedVehicle?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise()        .then(results => {
      console.log('involved Vehicle List', results);
      return results;
    });
  }

  private getInvolvedVehicle(id): Promise<any> {
    return this.http.get<any>(this.endpoint + 'CallForServiceInvolvedVehicle/' + id + '?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise();
  }

  private addInvolvedVehicle (vehicle: InvolvedVehiclesItem): Promise<any> {
    this.updateModel(vehicle);
    return this.http.post<any>(this.endpoint + 'CallForServiceInvolvedVehicle', JSON.stringify(vehicle), this.getHttpOptions()).toPromise();
  }

  private updateInvolvedVehicle (id, vehicle: InvolvedVehiclesItem): Promise<any> {
    this.updateModel(vehicle);
    return this.http.put(this.endpoint + 'CallForServiceInvolvedVehicle?callId=' + this.callService.getActiveCall().id + '&vehicleId=' + id, JSON.stringify(vehicle), this.getHttpOptions()).toPromise()
      .then(res => {
        return res;
      });
  }

  private deleteInvolvedVehicle (id): Promise<any> {
    return this.http.delete<any>(this.endpoint + 'CallForServiceInvolvedVehicle?callId=' + this.callService.getActiveCall().id + '&vehicleId==' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: InvolvedVehiclesItem) {
    model.callForServiceId = this.callService.getActiveCall().id;
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
    model.vehicle.createdUserId = this.authService.getUser().id;
    model.vehicle.ownerPerson.effectiveDateTime = new Date().toISOString();
    model.vehicle.ownerPerson.createdUserId = this.authService.getUser().id;

    model.vehicle.tagInformation.effectiveDateTime = new Date().toISOString();
    model.vehicle.tagInformation.createdUserId = this.authService.getUser().id;

    model.vehicle.effectiveDateTime = new Date().toISOString();
    model.vehicleDriverPerson.createdUserId = this.authService.getUser().id;
    model.vehicleDriverPerson.effectiveDateTime = new Date().toISOString();
  }
}
