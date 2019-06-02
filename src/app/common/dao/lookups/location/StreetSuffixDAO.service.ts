import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from '../../../auth/auth.service';
import { StreetNameSuffix } from '../../../models/lookups/location/StreetNameSuffix';

@Injectable({
  providedIn: 'root'
})
export class StreetSuffixDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getStreetSuffix(key);
      },
      load: () => {
          return this.getStreetSuffixs();
      },
      insert: (street) => {
        return this.addStreetSuffix(street);
      },
      update: (key, street) => {
        return this.updateStreetSuffix(key, street);
      },
      remove: (key) => {
          return this.deleteStreetSuffix(key);
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

  private getStreetSuffixs(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_STATE_SUFFIX_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getStreetSuffix(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_STATE_SUFFIX_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addStreetSuffix (street: StreetNameSuffix): Promise<any> {
    this.updateModel(street);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_STATE_SUFFIX_ADDRESS, JSON.stringify(street), this.getHttpOptions()).toPromise();
  }

  private updateStreetSuffix (id, street: StreetNameSuffix): Promise<any> {
    this.updateModel(street);

    return this.http.put(URL.CALL_FOR_SERVICE_STATE_SUFFIX_ADDRESS + '/' + id, JSON.stringify(street), this.getHttpOptions()).toPromise();
  }

  private deleteStreetSuffix(id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_STATE_SUFFIX_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: StreetNameSuffix) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
