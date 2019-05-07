import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallForService } from '../models/call/CallForService';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceDAO {
  endpoint = 'http://courtwareapp.azurewebsites.net/api/';

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
    return this.http.get(this.endpoint + 'CallForService?callStatus=' + type).toPromise();
  }

  getCall(id): Promise<any> {
    return this.http.get(this.endpoint + 'CallForService/' + id).toPromise();
  }

  addCall (call: CallForService): Promise<any> {
    console.log(call);
    return this.http.post<any>(this.endpoint + 'CallForService', JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  updateCall (id, call: CallForService): Promise<any> {
    return this.http.put(this.endpoint + 'CallForService/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  deleteCall (id): Promise<any> {
    return this.http.delete<any>(this.endpoint + 'CallForService/' + id, this.getHttpOptions()).toPromise();
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
