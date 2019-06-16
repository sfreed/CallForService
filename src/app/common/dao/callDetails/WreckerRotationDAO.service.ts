import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { BaseDAO } from '../BaseDAO';

@Injectable({
  providedIn: 'root'
})
export class WreckerRotationDAO extends BaseDAO {

  constructor(private http: HttpClient) {
    super();
    this.store = new CustomStore({
      key: 'id',
      byKey: (key) => {
        return this.getWReckerRotation(key);
      },
      load: () => {
        return this.getWReckerRotations();
      },
    });
  }

  public getWreckerRotationDS(type?): DataSource {
    const ds = new DataSource({
      store: this.store,
      select: type
    });

    return ds;
  }

  public getNextRotation(id): Promise<any> {
    return this.http.get(this.endpoint + 'WreckerRotationService/' + id, this.getHttpOptions()).toPromise();
  }

  private getWReckerRotation(key): Promise<any> {
    return this.http.get<any>(this.endpoint + 'WreckerRotation/' + key, this.getHttpOptions()).toPromise();
  }

  private getWReckerRotations(): Promise<any> {
    return this.http.get<any>(this.endpoint + 'WreckerRotation', this.getHttpOptions()).toPromise();
  }
}
