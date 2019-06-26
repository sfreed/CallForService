import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { EyeColor } from 'src/app/common/models/lookups/person/EyeColor';

@Injectable({
  providedIn: 'root'
})
export class EyeColorDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getEyeColor(key);
      },
      load: () => {
          return this.getEyeColors();
      },
      insert: (eyeColor) => {
        return this.addEyeColor(eyeColor);
      },
      update: (key, eyeColor) => {
        return this.updateEyeColor(key, eyeColor);
      },
      remove: (key) => {
          return this.deleteEyeColor(key);
      }
    });
  }

  public getEyeColorListDS(): DataSource {
    const ds = new DataSource({
      sort: 'eyeColorCodeDescription',
      store: this.store
    });

    return ds;
  }

  private getEyeColors(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_EYECOLOR_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getEyeColor(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_EYECOLOR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addEyeColor (eyeColor: EyeColor): Promise<any> {
    this.updateModel(eyeColor);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_EYECOLOR_ADDRESS, JSON.stringify(eyeColor), this.getHttpOptions()).toPromise();
  }

  private updateEyeColor (id, eyeColor: EyeColor): Promise<any> {
    this.updateModel(eyeColor);

    return this.http.put(URL.CALL_FOR_SERVICE_EYECOLOR_ADDRESS + '/' + id, JSON.stringify(eyeColor), this.getHttpOptions()).toPromise();
  }

  private deleteEyeColor (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_EYECOLOR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: EyeColor) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toDateString();
  }

}
