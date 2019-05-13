import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/enums/URL.enum';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import { Street } from '../../models/lookups/LocationLookup';

@Injectable({
  providedIn: 'root'
})
export class StreetDao extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getStreet(key);
      },
      load: () => {
          return this.Street();
      },
      insert: (callType) => {
        return this.addStreet(callType);
      },
      update: (key, callType) => {
        return this.updateStreet(key, callType);
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

  private Street(): Promise<any> {
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
