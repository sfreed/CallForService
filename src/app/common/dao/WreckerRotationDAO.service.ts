import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { BaseDAO } from './BaseDAO';

@Injectable({
  providedIn: 'root'
})
export class WreckerRotationDAO extends BaseDAO {

  constructor(private http: HttpClient) {
    super();
    this.store = new CustomStore({
      key: 'id',
      byKey: (key) => {
        return this.getNextRotation(key);
      }
    });
  }

  public getWreckerRotationDS(type?): DataSource {
    const ds = new DataSource({
      store: this.store,
      select: type
    });

    return ds;
  }

  private getNextRotation(id): Promise<any> {
    return this.http.get(this.endpoint + 'WreckerRotationService/' + id).toPromise();
  }
}
