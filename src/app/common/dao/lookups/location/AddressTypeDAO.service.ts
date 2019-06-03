import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from '../../../auth/auth.service';
import { AddressType } from '../../../models/lookups/location/AddressType';

@Injectable({
  providedIn: 'root'
})
export class AddressTypeDAO extends BaseDAO {
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getAddressType(key);
      },
      load: () => {
          return this.AddressType();
      },
      insert: (addressType) => {
        return this.addAddressType(addressType);
      },
      update: (key, addressType) => {
        return this.updateAddressType(key, addressType);
      },
      remove: (key) => {
          return this.deleteAddressType(key);
      }
    });
  }

  public getAddressTypeListDS(): DataSource {
    const ds = new DataSource({
      sort: 'addressTypeName',
      store: this.store
    });

    return ds;
  }

  private AddressType(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ADDRESS_TYPE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getAddressType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ADDRESS_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addAddressType (addressType: AddressType): Promise<any> {
    this.updateModel(addressType);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_ADDRESS_TYPE_ADDRESS, JSON.stringify(addressType), this.getHttpOptions()).toPromise();
  }

  private updateAddressType (id, addressType: AddressType): Promise<any> {
    this.updateModel(addressType);

    return this.http.put(URL.CALL_FOR_SERVICE_ADDRESS_TYPE_ADDRESS + '/' + id, JSON.stringify(addressType), this.getHttpOptions()).toPromise();
  }

  private deleteAddressType (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_ADDRESS_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: AddressType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
