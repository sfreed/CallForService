import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { AuthenticationService } from '../../../auth/auth.service';
import { BaseDAO } from 'src/app/common/dao/BaseDAO';
import { CallForServiceUnitDisposition } from 'src/app/common/models/lookups/callForService/CallForServiceUnitDisposition';

@Injectable({
  providedIn: 'root'
})
export class UnitDispositionDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getCallType(key);
      },
      load: () => {
          return this.getCallTypes();
      },
      insert: (unitDisposition) => {
        return this.addUnitDisposition(unitDisposition);
      },
      update: (key, unitDisposition) => {
        return this.updateUnitDisposition(key, unitDisposition);
      },
      remove: (key) => {
          return this.deleteUnitDisposition(key);
      }
    });
  }

  public getUnitDispositionListDS(): DataSource {
    const ds = new DataSource({
      sort: 'code',
      store: this.store
    });

    return ds;
  }

  private getCallTypes(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_UNIT_DISPOSITION_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getCallType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_UNIT_DISPOSITION_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addUnitDisposition (unitDisposition: CallForServiceUnitDisposition): Promise<any> {
    this.updateModel(unitDisposition);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_UNIT_DISPOSITION_ADDRESS, JSON.stringify(unitDisposition), this.getHttpOptions()).toPromise();
  }

  private updateUnitDisposition (id, unitDisposition: CallForServiceUnitDisposition): Promise<any> {
    this.updateModel(unitDisposition);

    return this.http.put(URL.CALL_FOR_SERVICE_UNIT_DISPOSITION_ADDRESS + '/' + id, JSON.stringify(unitDisposition), this.getHttpOptions()).toPromise();
  }

  private deleteUnitDisposition (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_UNIT_DISPOSITION_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: CallForServiceUnitDisposition) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
