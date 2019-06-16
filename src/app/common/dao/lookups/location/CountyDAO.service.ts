import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from '../../../auth/auth.service';
import { County } from 'src/app/common/models/lookups/location/County';

@Injectable({
  providedIn: 'root'
})
export class CountyDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getCounty(key);
      },
      load: () => {
          return this.getCounties();
      },
      insert: (county) => {
        return this.addCounty(county);
      },
      update: (key, county) => {
        return this.updateCounty(key, county);
      },
      remove: (key) => {
          return this.deleteCounty(key);
      }
    });
  }

  public getCountyListDS(): DataSource {
    const ds = new DataSource({
      sort: 'countyName',
      store: this.store
    });

    return ds;
  }

  private getCounties(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_COUNTY_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getCounty(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_COUNTY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addCounty (county: County): Promise<any> {
    this.updateModel(county);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_COUNTY_ADDRESS, JSON.stringify(county), this.getHttpOptions()).toPromise();
  }

  private updateCounty (id, county: County): Promise<any> {
    this.updateModel(county);

    return this.http.put(URL.CALL_FOR_SERVICE_COUNTY_ADDRESS + '/' + id, JSON.stringify(county), this.getHttpOptions()).toPromise();
  }

  private deleteCounty (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_COUNTY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: County) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
