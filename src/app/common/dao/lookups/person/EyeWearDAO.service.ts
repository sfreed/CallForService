import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { Eyewear } from 'src/app/common/models/lookups/person/EyeWear';

@Injectable({
  providedIn: 'root'
})
export class EyeWearDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getEyeWear(key);
      },
      load: () => {
          return this.getEyeWears();
      },
      insert: (eyeWear) => {
        return this.addEyeWear(eyeWear);
      },
      update: (key, eyeWear) => {
        return this.updateEyeWear(key, eyeWear);
      },
      remove: (key) => {
          return this.deleteEyeWear(key);
      }
    });
  }

  public getEyeWearListDS(): DataSource {
    const ds = new DataSource({
      sort: 'eyewearCodeDescription',
      store: this.store
    });

    return ds;
  }

  private getEyeWears(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_EYEWEAR_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getEyeWear(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_EYEWEAR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addEyeWear (eyeWear: Eyewear): Promise<any> {
    this.updateModel(eyeWear);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_EYEWEAR_ADDRESS, JSON.stringify(eyeWear), this.getHttpOptions()).toPromise();
  }

  private updateEyeWear (id, eyeWear: Eyewear): Promise<any> {
    this.updateModel(eyeWear);

    return this.http.put(URL.CALL_FOR_SERVICE_EYEWEAR_ADDRESS + '/' + id, JSON.stringify(eyeWear), this.getHttpOptions()).toPromise();
  }

  private deleteEyeWear (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_EYEWEAR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: Eyewear) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toDateString();
  }

}
