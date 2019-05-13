import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/enums/URL.enum';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import { State } from '../../models/lookups/LocationLookup';

@Injectable({
  providedIn: 'root'
})
export class StateDao extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getState(key);
      },
      load: () => {
          return this.State();
      },
      insert: (callType) => {
        return this.addState(callType);
      },
      update: (key, callType) => {
        return this.updateState(key, callType);
      },
      remove: (key) => {
          return this.deleteState(key);
      }
    });
  }

  public getStateListDS(): DataSource {
    const ds = new DataSource({
      sort: 'stateName',
      store: this.store
    });

    return ds;
  }

  private State(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_STATE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getState(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_STATE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addState (call: State): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_STATE_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private updateState (id, call: State): Promise<any> {
    this.updateModel(call);

    return this.http.put(URL.CALL_FOR_SERVICE_STATE_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private deleteState (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_STATE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: State) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
