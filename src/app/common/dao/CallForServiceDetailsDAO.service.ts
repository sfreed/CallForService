import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../models/enums/URL.enum';
import { BaseDAO } from './BaseDAO';
import { BaseModel } from '../models/common/BaseModel';
import { AuthenticationService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceDetailsDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      byKey: (key) => {
        return this.getCallDetailsById(key);
      }
    });
  }

  public getCallDetailsDS(type?): DataSource {
    const ds = new DataSource({
      sort: 'receivedDateTime',
      store: this.store,
      select: type
    });

    return ds;
  }

  private getCallDetailsById(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_DETAILS_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: BaseModel) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
