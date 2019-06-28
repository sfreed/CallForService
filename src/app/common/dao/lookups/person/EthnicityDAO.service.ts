import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { Ethnicity } from 'src/app/common/models/lookups/person/Ethnicity';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EthnicityDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getEthnicity(key);
      },
      load: () => {
          return this.getEthnicitys();
      },
      insert: (ethnicity) => {
        return this.addEthnicity(ethnicity);
      },
      update: (key, ethnicity) => {
        return this.updateEthnicity(key, ethnicity);
      },
      remove: (key) => {
          return this.deleteEthnicity(key);
      }
    });
  }

  public getEthnicityListDS(): DataSource {
    const ds = new DataSource({
      sort: 'ethnicityCodeDescription',
      store: this.store
    });

    return ds;
  }

  private getEthnicitys(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ETHNICITY_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getEthnicity(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_ETHNICITY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addEthnicity (ethnicity: Ethnicity): Promise<any> {
    this.updateModel(ethnicity);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_ETHNICITY_ADDRESS, JSON.stringify(ethnicity), this.getHttpOptions()).toPromise();
  }

  private updateEthnicity (id, ethnicity: Ethnicity): Promise<any> {
    this.updateModel(ethnicity);

    return this.http.put(URL.CALL_FOR_SERVICE_ETHNICITY_ADDRESS + '/' + id, JSON.stringify(ethnicity), this.getHttpOptions()).toPromise();
  }

  private deleteEthnicity (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_VEHICLE_COLOR_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: Ethnicity) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
