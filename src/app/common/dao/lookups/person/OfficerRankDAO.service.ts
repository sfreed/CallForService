import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { OfficerRank } from 'src/app/common/models/lookups/person/OfficerRank';

@Injectable({
  providedIn: 'root'
})
export class OfficerRankDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getOfficerRank(key);
      },
      load: () => {
          return this.getOfficerRanks();
      },
      insert: (officerRank) => {
        return this.addOfficerRank(officerRank);
      },
      update: (key, officerRank) => {
        return this.updateOfficerRank(key, officerRank);
      },
      remove: (key) => {
          return this.deleteOfficerRank(key);
      }
    });
  }

  public getOfficerRankListDS(): DataSource {
    const ds = new DataSource({
      sort: 'officerRankDescription',
      store: this.store
    });

    return ds;
  }

  private getOfficerRanks(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_OFFICER_RANK_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getOfficerRank(id): Promise<any> {
    return this.http.get(URL + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addOfficerRank (officerRank: OfficerRank): Promise<any> {
    this.updateModel(officerRank);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_OFFICER_RANK_ADDRESS, JSON.stringify(officerRank), this.getHttpOptions()).toPromise();
  }

  private updateOfficerRank (id, officerRank: OfficerRank): Promise<any> {
    this.updateModel(officerRank);

    return this.http.put(URL.CALL_FOR_SERVICE_OFFICER_RANK_ADDRESS + '/' + id, JSON.stringify(officerRank), this.getHttpOptions()).toPromise();
  }

  private deleteOfficerRank (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_OFFICER_RANK_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: OfficerRank) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toDateString();
  }

}
