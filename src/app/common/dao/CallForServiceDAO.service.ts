import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallForService } from '../models/call/CallForService';
import { URL } from '../models/enums/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceDAO {
  store: CustomStore;
  datasource: DataSource;

  constructor(private http: HttpClient) {
    this.store = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
          return this.getCalls(loadOptions.select);
      },
      insert: (values) => {
          return this.updateCall(values.id, values);
      },
      update: (key, values) => {
        return this.updateCall(key, values);
      },
      remove: (key) => {
          return this.deleteCall(key);
      }
    });
  }

  getHttpOptions(): any {
    return  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('id_token')
      })
    };
  }

  getCalls(type): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ADDRESS + '?callStatus=' + type).toPromise();
  }

  getCall(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ADDRESS + '/' + id).toPromise();
  }

  addCall (call: CallForService): Promise<any> {
    console.log(call);
    return this.http.post<any>(URL.CALL_FOR_SERVICE_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  updateCall (id, call: CallForService): Promise<any> {
    return this.http.put(URL.CALL_FOR_SERVICE_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  deleteCall (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  getCallListDS(type?): DataSource {
    const ds =   new DataSource({
      sort: 'receivedDateTime',
      store: this.store,
      select: type
    });

    return ds;
  }
}
