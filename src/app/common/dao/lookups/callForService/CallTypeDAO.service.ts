import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from '../../../auth/auth.service';
import { CallForServiceType } from '../../../models/lookups/callForService/CallForServiceType';

@Injectable({
  providedIn: 'root'
})
export class CallTypeDAO extends BaseDAO {

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
      insert: (callType) => {
        return this.addCallType(callType);
      },
      update: (key, callType) => {
        return this.updateCallType(key, callType);
      },
      remove: (key) => {
          return this.deleteCallType(key);
      }
    });
  }

  public getCallTypeListDS(): DataSource {
    const ds = new DataSource({
      sort: 'code',
      store: this.store
    });

    return ds;
  }

  private getCallTypes(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CALL_TYPE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getCallType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CALL_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addCallType (callType: CallForServiceType): Promise<any> {
    this.updateModel(callType);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_CALL_TYPE_ADDRESS, JSON.stringify(callType), this.getHttpOptions()).toPromise();
  }

  private updateCallType (id, callType: CallForServiceType): Promise<any> {
    this.updateModel(callType);

    return this.http.put(URL.CALL_FOR_SERVICE_CALL_TYPE_ADDRESS + '/' + id, JSON.stringify(callType), this.getHttpOptions()).toPromise();
  }

  private deleteCallType (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_CALL_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: CallForServiceType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
