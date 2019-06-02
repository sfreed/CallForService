import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../../models/common/URL.enum';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from '../../../auth/auth.service';
import { Zone } from '../../../models/lookups/location/Zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneDAO extends BaseDAO {
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getZone(key);
      },
      load: () => {
          return this.Zone();
      },
      insert: (callType) => {
        return this.addZone(callType);
      },
      update: (key, callType) => {
        return this.updateZone(key, callType);
      },
      remove: (key) => {
          return this.deleteZone(key);
      }
    });
  }

  public getZoneListDS(): DataSource {
    const ds = new DataSource({
      sort: 'description',
      store: this.store
    });

    return ds;
  }

  private Zone(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ZONE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getZone(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ZONE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addZone (call: Zone): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_ZONE_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private updateZone (id, call: Zone): Promise<any> {
    this.updateModel(call);

    return this.http.put(URL.CALL_FOR_SERVICE_ZONE_ADDRESS + '/' + id, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  private deleteZone (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_ZONE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: Zone) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
  }
}
