import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { BaseDAO } from '../BaseDAO';
import { URL } from '../../models/common/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class WreckerServiceDAO extends BaseDAO {

  constructor(private http: HttpClient) {
    super();
    this.store = new CustomStore({
      key: 'id',
      byKey: (id) => {
        return this.getWreckerService(id);
      },
      load: () => {
        return this.getWreckerServices();
      },
    });
  }

  public getWreckerServiceDS(): DataSource {
    const ds = new DataSource({
      store: this.store
    });

    return ds;
  }

  private getWreckerService(key): Promise<any> {
    return this.http.get<any>(URL.CALL_FOR_SERVICE_WRECKER_SERVICE_ADDRESS + '/' + key, this.getHttpOptions()).toPromise();
  }

  private getWreckerServices(): Promise<any> {
    return this.http.get<any>(URL.CALL_FOR_SERVICE_WRECKER_SERVICE_ADDRESS, this.getHttpOptions()).toPromise();
  }

}
