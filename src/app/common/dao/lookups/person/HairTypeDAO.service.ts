import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { HairType } from 'src/app/common/models/lookups/person/HairType';

@Injectable({
  providedIn: 'root'
})
export class HairTypeDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getHairType(key);
      },
      load: () => {
          return this.getHairTypes();
      },
      insert: (hairType) => {
        return this.addHairType(hairType);
      },
      update: (key, hairType) => {
        return this.updateHairType(key, hairType);
      },
      remove: (key) => {
          return this.deleteHairType(key);
      }
    });
  }

  public getHairTypeListDS(): DataSource {
    const ds = new DataSource({
      sort: 'r',
      store: this.store
    });

    return ds;
  }

  private getHairTypes(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_HAIR_TYPE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getHairType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_HAIR_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addHairType (hairType: HairType): Promise<any> {
    this.updateModel(hairType);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_HAIR_TYPE_ADDRESS, JSON.stringify(hairType), this.getHttpOptions()).toPromise();
  }

  private updateHairType (id, hairType: HairType): Promise<any> {
    this.updateModel(hairType);

    return this.http.put(URL.CALL_FOR_SERVICE_HAIR_TYPE_ADDRESS + '/' + id, JSON.stringify(hairType), this.getHttpOptions()).toPromise();
  }

  private deleteHairType (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_HAIR_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: HairType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
