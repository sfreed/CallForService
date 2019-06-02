import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { BaseDAO } from '../BaseDAO';
import { BaseModel } from '../../models/BaseModel';
import { AuthenticationService } from '../../auth/auth.service';
import { AvailableUnit } from '../../models/units/AvailableUnit';
import { URL } from '../../models/common/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class UnitsDAO extends BaseDAO {

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
      insert: (unit) => {
          return this.addUnit(unit);
      },
      update: (key, unit) => {
        return this.updateUnit(key, unit);
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

  private addUnit (unit: AvailableUnit): Promise<any> {
    this.updateModel(unit);

    return this.http.post<any>(URL.CFS_UNIT_ADDRESS, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  private updateUnit (id, unit: AvailableUnit): Promise<any> {
    this.updateModel(unit);

    return this.http.put(URL.CFS_UNIT_ADDRESS + '/' + id, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  private deleteUnit (id): Promise<any> {
    return this.http.delete<any>(URL.CFS_UNIT_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: BaseModel) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
