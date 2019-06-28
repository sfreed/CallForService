import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/common/URL.enum';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import { Agency } from '../../models/common/Agency';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AgencyDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getAgency(key);
      },
      load: () => {
          return this.getAgencies();
      },
      insert: (agency) => {
        return this.addAgency(agency);
      },
      update: (key, agency) => {
        return this.updateAgency(key, agency);
      },
      remove: (key) => {
          return this.deleteAgency(key);
      }
    });
  }

  public getAgencyListDS(): DataSource {
    const ds = new DataSource({
      sort: 'code',
      store: this.store
    });

    return ds;
  }

  private getAgencies(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_AGENCY_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getAgency(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_AGENCY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addAgency(agency: Agency): Promise<any> {
    this.updateModel(agency);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_AGENCY_ADDRESS, JSON.stringify(agency), this.getHttpOptions()).toPromise();
  }

  private updateAgency(id, agency: Agency): Promise<any> {
    this.updateModel(agency);

    return this.http.put(URL.CALL_FOR_SERVICE_AGENCY_ADDRESS + '/' + id, JSON.stringify(agency), this.getHttpOptions()).toPromise();
  }

  private deleteAgency(id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_AGENCY_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: Agency) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
