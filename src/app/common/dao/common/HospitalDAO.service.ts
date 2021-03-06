import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/common/URL.enum';
import { AuthenticationService } from '../../auth/auth.service';
import { BaseDAO } from '../BaseDAO';
import { CallForServiceHospital } from '../../models/common/CallForServiceHospital';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HospitalDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getHospital(key);
      },
      load: () => {
          return this.getHospitals();
      },
      insert: (hospital) => {
        return this.addHospital(hospital);
      },
      update: (key, hospital) => {
        return this.updateHospital(key, hospital);
      },
      remove: (key) => {
          return this.deleteHospital(key);
      }
    });
  }

  public getHospitalListDS(): DataSource {
    const ds = new DataSource({
      sort: 'code',
      store: this.store
    });

    return ds;
  }

  private getHospitals(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_HOSPITAL_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getHospital(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_HOSPITAL_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addHospital (hospital: CallForServiceHospital): Promise<any> {
    this.updateModel(hospital);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_HOSPITAL_ADDRESS, JSON.stringify(hospital), this.getHttpOptions()).toPromise();
  }

  private updateHospital (id, hospital: CallForServiceHospital): Promise<any> {
    this.updateModel(hospital);

    return this.http.put(URL.CALL_FOR_SERVICE_HOSPITAL_ADDRESS + '/' + id, JSON.stringify(hospital), this.getHttpOptions()).toPromise();
  }

  private deleteHospital (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_HOSPITAL_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: CallForServiceHospital) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
