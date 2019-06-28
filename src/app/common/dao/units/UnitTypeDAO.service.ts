import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { BaseDAO } from '../BaseDAO';
import { BaseModel } from '../../models/BaseModel';
import { AuthenticationService } from '../../auth/auth.service';
import { URL } from '../../models/common/URL.enum';
import { CallForServiceUnitType } from '../../models/lookups/callForService/CallForServiceUnitType';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeTypeDAO extends BaseDAO {

  unitDS: DataSource;

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getUnitType(key);
      },
      load: (loadOptions) => {
        return this.getUnitTypes();
      },
      insert: (unit) => {
          return this.addUnitType(unit);
      },
      update: (key, unit) => {
        return this.updateUnitType(key, unit);
      },
      remove: (key) => {
          return this.deleteUnitType(key);
      }
    });
  }

  public getUnitTypesDS(): DataSource {
    const ds =  new DataSource({
      store: this.store,
      sort: 'unitDescription'
    });

    return ds;
  }

  private getUnitTypes(): Promise<any> {
    return this.http.get(URL.CFS_UNIT_TYPE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getUnitType(id): Promise<any> {
    return this.http.get(URL.CFS_UNIT_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addUnitType (unit: CallForServiceUnitType): Promise<any> {
    this.updateModel(unit);

    return this.http.post<any>(URL.CFS_UNIT_TYPE_ADDRESS, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  private updateUnitType (id, unit: CallForServiceUnitType): Promise<any> {
    this.updateModel(unit);

    return this.http.put(URL.CFS_UNIT_TYPE_ADDRESS + '/' + id, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  private deleteUnitType (id): Promise<any> {
    return this.http.delete<any>(URL.CFS_UNIT_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: BaseModel) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
