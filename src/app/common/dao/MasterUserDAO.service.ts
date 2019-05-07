import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { MasterUser } from '../models/master/MasterUser';

@Injectable({
  providedIn: 'root'
})
export class MasterUserDAO {

  endpoint = 'http://courtwareapp.azurewebsites.net/api/';

  store: CustomStore;
  datasource: DataSource;

  constructor(private http: HttpClient) {
    this.store = new CustomStore({
      key: 'id',
      byKey: (key) => {
        return this.getMasterUser(key);
      },
      insert: (values) => {
          return this.addMasterUser(values);
      },
      update: (key, values) => {
        return this.updateMasterUser(key, values);
      },
      remove: (key) => {
          return this.deleteMasterUser(key);
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


  getMasterUser(id): Promise<any> {
    return this.http.get(this.endpoint + 'MasterUser/' + id).toPromise();
  }

  addMasterUser (call: MasterUser): Promise<any> {
    console.log(call);
    return this.http.post<any>(this.endpoint + 'MasterUser', JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  updateMasterUser (id, call: MasterUser): Promise<any> {
    return this.http.put(this.endpoint + 'MasterUser/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  deleteMasterUser (id): Promise<any> {
    return this.http.delete<any>(this.endpoint + 'MasterUser/' + id, this.getHttpOptions()).toPromise();
  }

  getMasterUsersDS(): DataSource {
    return this.datasource;
  }
}
