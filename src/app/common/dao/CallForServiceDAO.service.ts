import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallForService } from '../models/call/CallForService';
import { URL } from '../models/enums/URL.enum';
import { BaseDAO } from './BaseDAO';
import { AuthenticationService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
          return this.getCallsByStatus(loadOptions.select);
      },
      insert: (call) => {
        return this.addCall(call);
      },
      update: (key, call) => {
        return this.updateCall(key, call);
      },
      remove: (key) => {
          return this.deleteCall(key);
      }
    });
  }

  public getCallListDS(key?, value?): DataSource {
    const ds = new DataSource({
      sort: 'receivedDateTime',
      store: this.store,
      select: [ key, value ],
      pageSize: 20,
      paginate: true
    });

    return ds;
  }

  private getCallsByStatus(status): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ADDRESS + '?' + status[0] + '=' + status[1], this.getHttpOptions()).toPromise();
  }

  private addCall (call: CallForService): Promise<any> {
    this.updateModel(call);

    console.log('inserting call', JSON.stringify(call));

    return this.http.post<any>(URL.CALL_FOR_SERVICE_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private updateCall (id, call: CallForService): Promise<any> {
    this.updateModel(call);

    console.log('updating call', JSON.stringify(call));

    return this.http.put(URL.CALL_FOR_SERVICE_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private deleteCall (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: CallForService) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
    if (model.locationPrimary) {
      model.locationPrimary.createdUserId = this.authService.getUser().id;
      model.locationPrimary.effectiveDateTime = new Date().toISOString();
    }

    if (model.secondaryLocationLocation) {
      model.secondaryLocationLocation.createdUserId = this.authService.getUser().id;
      model.secondaryLocationLocation.effectiveDateTime = new Date().toISOString();
    }
  }
}
