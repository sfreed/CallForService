import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { HairColor } from 'src/app/common/models/lookups/person/HairColor';

@Injectable({
  providedIn: 'root'
})
export class HairColorDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getHairColor(key);
      },
      load: () => {
          return this.getHairColors();
      },
      insert: (hairColor) => {
        return this.addHairColor(hairColor);
      },
      update: (key, hairColor) => {
        return this.updateHairColor(key, hairColor);
      },
      remove: (key) => {
          return this.deleteHairColor(key);
      }
    });
  }

  public getHairColorListDS(): DataSource {
    const ds = new DataSource({
      sort: 'hairColorCodeDescription',
      store: this.store
    });

    return ds;
  }

  private getHairColors(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_HAIR_COLOR_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getHairColor(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_HAIR_COLOR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addHairColor (hairColor: HairColor): Promise<any> {
    this.updateModel(hairColor);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_HAIR_COLOR_ADDRESS, JSON.stringify(hairColor), this.getHttpOptions()).toPromise();
  }

  private updateHairColor (id, hairColor: HairColor): Promise<any> {
    this.updateModel(hairColor);

    return this.http.put(URL.CALL_FOR_SERVICE_HAIR_COLOR_ADDRESS + '/' + id, JSON.stringify(hairColor), this.getHttpOptions()).toPromise();
  }

  private deleteHairColor (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_HAIR_COLOR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: HairColor) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }

}
