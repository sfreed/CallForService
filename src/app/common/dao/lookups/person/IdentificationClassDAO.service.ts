import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { IdentificationClass } from 'src/app/common/models/lookups/person/IdentificationClass';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/app/common/models/common/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class IdentificationClassDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getIdentificationClass(key);
      },
      load: () => {
          return this.getIdentificationClasss();
      },
      insert: (idClass) => {
        return this.addIdentificationClass(idClass);
      },
      update: (key, idClass) => {
        return this.updateIdentificationClass(key, idClass);
      },
      remove: (key) => {
          return this.deleteIdentificationClass(key);
      }
    });
  }

  public getIdentificationClassListDS(): DataSource {
    const ds = new DataSource({
      sort: 'description',
      store: this.store
    });

    return ds;
  }

  private getIdentificationClasss(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ID_CLASS_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getIdentificationClass(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ID_CLASS_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addIdentificationClass (idClass: IdentificationClass): Promise<any> {
    this.updateModel(idClass);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_ID_CLASS_ADDRESS, JSON.stringify(idClass), this.getHttpOptions()).toPromise();
  }

  private updateIdentificationClass (id, idClass: IdentificationClass): Promise<any> {
    this.updateModel(idClass);

    return this.http.put(URL.CALL_FOR_SERVICE_ID_CLASS_ADDRESS + '/' + id, JSON.stringify(idClass), this.getHttpOptions()).toPromise();
  }

  private deleteIdentificationClass (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_ID_CLASS_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: IdentificationClass) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
