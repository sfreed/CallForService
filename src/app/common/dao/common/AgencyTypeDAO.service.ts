import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/common/URL.enum';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import { AgencyType } from '../../models/common/AgencyType';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AgencyTypeDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService,  private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getAgencyType(key);
      },
      load: () => {
          return this.getAgencyTypes();
      },
      insert: (agencyType) => {
        return this.addAgencyType(agencyType);
      },
      update: (key, agencyType) => {
        return this.updateAgencyType(key, agencyType);
      },
      remove: (key) => {
          return this.deleteAgencyType(key);
      }
    });
  }

  public getAgencyTypeListDS(): DataSource {
    const ds = new DataSource({
      sort: 'code',
      store: this.store
    });

    return ds;
  }

  private getAgencyTypes(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_AGENCY_TYPE_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getAgencyType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_AGENCY_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addAgencyType(agencyType: AgencyType): Promise<any> {
    this.updateModel(agencyType);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_AGENCY_TYPE_ADDRESS, JSON.stringify(agencyType), this.getHttpOptions()).toPromise();
  }

  private updateAgencyType(id, agencyType: AgencyType): Promise<any> {
    this.updateModel(agencyType);

    return this.http.put(URL.CALL_FOR_SERVICE_AGENCY_TYPE_ADDRESS + '/' + id, JSON.stringify(agencyType), this.getHttpOptions()).toPromise();
  }

  private deleteAgencyType(id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_AGENCY_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: AgencyType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }
}
