import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { MasterUser } from '../models/master/MasterUser';
import { BaseDAO } from './BaseDAO';
import { BaseModel } from '../models/common/BaseModel';
import { AuthenticationService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MasterUserDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
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

  public getMasterUsersDS(): DataSource {
    const ds = new DataSource({
      store: this.store,
    });

    return ds;
  }

  private getMasterUser(id): Promise<any> {
    return this.http.get(this.endpoint + 'MasterUser/' + id, this.getHttpOptions()).toPromise();
  }

  private addMasterUser (user: MasterUser): Promise<any> {
    this.updateModel(user);

    return this.http.post<any>(this.endpoint + 'MasterUser', JSON.stringify(user), this.getHttpOptions()).toPromise();
  }

  private updateMasterUser (id, user: MasterUser): Promise<any> {
    this.updateModel(user);

    return this.http.put(this.endpoint + 'MasterUser/' + id, JSON.stringify(user), this.getHttpOptions()).toPromise();
  }

  private deleteMasterUser (id): Promise<any> {
    return this.http.delete<any>(this.endpoint + 'MasterUser/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: BaseModel) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
