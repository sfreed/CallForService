import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from '../../../auth/auth.service';
import { State } from '../../../models/lookups/location/State';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StateDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
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
      insert: (state) => {
        return this.addState(state);
      },
      update: (key, state) => {
        return this.updateState(key, state);
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

  private addState (state: State): Promise<any> {
    this.updateModel(state);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_STATE_ADDRESS, JSON.stringify(state), this.getHttpOptions()).toPromise();
  }

  private updateState (id, state: State): Promise<any> {
    this.updateModel(state);

    return this.http.put(URL.CALL_FOR_SERVICE_STATE_ADDRESS + '/' + id, JSON.stringify(state), this.getHttpOptions()).toPromise();
  }

  private deleteState (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_STATE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: State) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }
}
