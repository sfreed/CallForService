import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallForService } from '../models/call/CallForService';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceDetailsDAO {
  endpoint = 'http://courtwareapp.azurewebsites.net/api/';

  store: CustomStore;
  datasource: DataSource;

  constructor(private http: HttpClient) {
    this.store = new CustomStore({
      key: 'id',
      byKey: (key) => {
        return this.getCallDetails(key);
      },
      insert: (values) => {
          return this.addCallDetails(values);
      },
      update: (key, values) => {
        return this.updateCallDetails(key, values);
      },
      remove: (key) => {
          return this.deleteCallDetails(key);
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


  getCallDetails(id): Promise<any> {
    return this.http.get(this.endpoint + 'CallForServiceDetails/' + id).toPromise();
  }

  addCallDetails (call: CallForService): Promise<any> {
    console.log(call);
    return this.http.post<any>(this.endpoint + 'CallForServiceDetails', JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  updateCallDetails (id, call: CallForService): Promise<any> {
    return this.http.put(this.endpoint + 'CallForServiceDetails/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  deleteCallDetails (id): Promise<any> {
    return this.http.delete<any>(this.endpoint + 'CallForServiceDetails/' + id, this.getHttpOptions()).toPromise();
  }

  getCallDetailsDS(type?): DataSource {
    const ds =   new DataSource({
      sort: 'receivedDateTime',
      store: this.store,
      select: type
    });

    return ds;
  }
}
