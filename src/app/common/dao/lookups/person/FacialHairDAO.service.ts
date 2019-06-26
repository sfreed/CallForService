import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { FacialHair } from 'src/app/common/models/lookups/person/FacialHair';

@Injectable({
  providedIn: 'root'
})
export class FacialHairDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getFacialHair(key);
      },
      load: () => {
          return this.getFacialHairs();
      },
      insert: (facialHair) => {
        return this.addFacialHair(facialHair);
      },
      update: (key, facialHair) => {
        return this.updateFacialHair(key, facialHair);
      },
      remove: (key) => {
          return this.deleteFacialHair(key);
      }
    });
  }

  public getFacialHairListDS(): DataSource {
    const ds = new DataSource({
      sort: 'facialHairCodeDescription',
      store: this.store
    });

    return ds;
  }

  private getFacialHairs(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_FACIAL_HAIR_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getFacialHair(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_FACIAL_HAIR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addFacialHair (facialHair: FacialHair): Promise<any> {
    this.updateModel(facialHair);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_FACIAL_HAIR_ADDRESS, JSON.stringify(facialHair), this.getHttpOptions()).toPromise();
  }

  private updateFacialHair (id, facialHair: FacialHair): Promise<any> {
    this.updateModel(facialHair);

    return this.http.put(URL.CALL_FOR_SERVICE_FACIAL_HAIR_ADDRESS + '/' + id, JSON.stringify(facialHair), this.getHttpOptions()).toPromise();
  }

  private deleteFacialHair (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_FACIAL_HAIR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: FacialHair) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toDateString();
  }

}
