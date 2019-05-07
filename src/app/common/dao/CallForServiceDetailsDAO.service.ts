import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallForService } from '../models/call/CallForService';
import { URL } from '../models/enums/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceDetailsDAO {

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
    return this.http.get(URL.CALL_FOR_SERVICE_DETAILS_ADDRESS + '/' + id).toPromise();
  }

  addCallDetails (call: CallForService): Promise<any> {
    console.log(call);
    return this.http.post<any>(URL.CALL_FOR_SERVICE_DETAILS_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  updateCallDetails (id, call: CallForService): Promise<any> {
    return this.http.put(URL.CALL_FOR_SERVICE_DETAILS_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  deleteCallDetails (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_DETAILS_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
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
