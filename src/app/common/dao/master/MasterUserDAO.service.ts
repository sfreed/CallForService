import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { MasterUser } from '../../models/master/MasterUser';
import { BaseDAO } from '../BaseDAO';
import { BaseModel } from '../../models/BaseModel';
import { AuthenticationService } from '../../auth/auth.service';
import { URL } from '../../models/common/URL.enum';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MasterUserDAO extends BaseDAO {

  masterUserDS: DataSource;

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getMasterUser(key);
      },
      load: () => {
        return this.getMasterUsers();
      },
      insert: (master) => {
          return this.addMasterUser(master);
      },
      update: (key, master) => {
        return this.updateMasterUser(key, master);
      },
      remove: (key) => {
          return this.deleteMasterUser(key);
      }
    });

    this.masterUserDS = new DataSource({
      store: this.store,
      sort: 'fullName'
    });
  }

  public getMasterUsersDS(): DataSource {
    return this.masterUserDS;
  }

  private getMasterUsers(): Promise<any> {
    return this.http.get(URL.DISPATCHER_ADDRESS, this.getHttpOptions()).toPromise()
    .then(results => {
      console.log('Master User List', results);
      return results;
    });
  }

  private getMasterUser(id): Promise<any> {
    return this.http.get(URL.DISPATCHER_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addMasterUser (master: MasterUser): Promise<any> {
    this.updateModel(master);

    return this.http.post<any>(URL.DISPATCHER_ADDRESS, JSON.stringify(master), this.getHttpOptions()).toPromise();
  }

  private updateMasterUser (id, master: MasterUser): Promise<any> {
    this.updateModel(master);

    return this.http.put(URL.DISPATCHER_ADDRESS + '/' + id, JSON.stringify(master), this.getHttpOptions()).toPromise();
  }

  private deleteMasterUser (id): Promise<any> {
    return this.http.delete<any>(URL.DISPATCHER_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: BaseModel) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }
}
