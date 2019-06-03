import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from '../../../auth/auth.service';
import { Street } from '../../../models/lookups/location/Street';

@Injectable({
  providedIn: 'root'
})
export class StreetDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getStreet(key);
      },
      load: () => {
          return this.getStreets();
      },
      insert: (street) => {
        return this.addStreet(street);
      },
      update: (key, street) => {
        return this.updateStreet(key, street);
      },
      remove: (key) => {
          return this.deleteStreet(key);
      }
    });
  }

  public getStreetListDS(): DataSource {
    const ds = new DataSource({
      sort: 'streetName',
      store: this.store
    });

    return ds;
  }

  private getStreets(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_STREET_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getStreet(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_STREET_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addStreet (street: Street): Promise<any> {
    this.updateModel(street);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_STREET_ADDRESS, JSON.stringify(street), this.getHttpOptions()).toPromise();
  }

  private updateStreet (id, street: Street): Promise<any> {
    this.updateModel(street);

    return this.http.put(URL.CALL_FOR_SERVICE_STREET_ADDRESS + '/' + id, JSON.stringify(street), this.getHttpOptions()).toPromise();
  }

  private deleteStreet (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_STREET_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: Street) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
