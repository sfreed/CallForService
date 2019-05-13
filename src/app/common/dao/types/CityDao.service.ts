import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/enums/URL.enum';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import { City } from '../../models/lookups/LocationLookup';

@Injectable({
  providedIn: 'root'
})
export class CityDao extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getCity(key);
      },
      load: () => {
          return this.City();
      },
      insert: (callType) => {
        return this.addCity(callType);
      },
      update: (key, callType) => {
        return this.updateCity(key, callType);
      },
      remove: (key) => {
          return this.deleteCity(key);
      }
    });
  }

  public getCityListDS(): DataSource {
    const ds = new DataSource({
      sort: 'cityName',
      store: this.store
    });

    return ds;
  }

  private City(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CITY_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getCity(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CITY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addCity (call: City): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_CITY_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private updateCity (id, call: City): Promise<any> {
    this.updateModel(call);

    return this.http.put(URL.CALL_FOR_SERVICE_CITY_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private deleteCity (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_CITY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: City) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
