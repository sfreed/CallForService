import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { BaseDAO } from './BaseDAO';
import { BaseModel } from '../models/common/BaseModel';
import { AuthenticationService } from '../auth/auth.service';
import { CallForServiceUnit } from '../models/unit/CallForServiceUnit';
import { URL } from '../models/enums/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class UnitsDao extends BaseDAO {

  unitDS: DataSource;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getUnit(key);
      },
      load: (loadOptions) => {
        return this.getUnits(loadOptions.select);
      },
      insert: (values) => {
          return this.addUnit(values);
      },
      update: (key, values) => {
        return this.updateUnit(key, values);
      },
      remove: (key) => {
          return this.deleteUnit(key);
      }
    });
  }

  public getUnitsDS(): DataSource {
    const ds =  new DataSource({
      store: this.store,
      sort: 'unitDescription'
    });

    return ds;
  }

  private getUnits(unitType): Promise<any> {
    return this.http.get(URL.CFS_UNIT_ADDRESS + '?status=' + unitType, this.getHttpOptions()).toPromise();
  }

  private getUnit(id): Promise<any> {
    return this.http.get(URL.CFS_UNIT_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addUnit (user: CallForServiceUnit): Promise<any> {
    this.updateModel(user);

    return this.http.post<any>(URL.CFS_UNIT_ADDRESS, JSON.stringify(user), this.getHttpOptions()).toPromise();
  }

  private updateUnit (id, user: CallForServiceUnit): Promise<any> {
    this.updateModel(user);

    console.log('changing unit status', user);

    return this.http.put(URL.CFS_UNIT_ADDRESS + '/' + id, JSON.stringify(user), this.getHttpOptions()).toPromise();
  }

  private deleteUnit (id): Promise<any> {
    return this.http.delete<any>(URL.CFS_UNIT_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: BaseModel) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
