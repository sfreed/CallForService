import { Injectable } from '@angular/core';
import { BaseDAO } from '../BaseDAO';
import { CallsService } from '../../services/call/Calls.service';
import { AuthenticationService } from '../../auth/auth.service';
import { InvolvedPersonItem } from '../../models/callDetails/InvolvedPersonItem';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { InvolvedUnitsItem } from '../../models/callDetails/InvolvedUnitItem';

@Injectable({
  providedIn: 'root'
})
export class InvolvedUnitDAO extends BaseDAO {

  constructor(private http: HttpClient, private callService: CallsService, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'personId',
      byKey: (key) => {
        return this.getInvolvedUnit(key);
      },
      load: () => {
        return this.getInvolvedUnits();
      },
      insert: (person) => {
        return this.addInvolvedUnit(person);
      },
      update: (key, person: InvolvedUnitsItem) => {
        return this.updateInvolvedUnit(key, person);
      },
      remove: (key) => {
          return this.deleteInvolvedUnit(key);
      }
    });
  }

  public getInvolvedUnitsDS(): DataSource {
    const ds =   new DataSource({
      store: this.store
    });

    return ds;
  }

  private getInvolvedUnits(): Promise<any> {
    return this.http.get<any>(this.endpoint + 'CallForServiceInvolvedUnit?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise()
      .then(results => {
        console.log('involved Units List', results);
        return results;
      });
  }
  private getInvolvedUnit(id): Promise<any> {
    return this.http.get<any>(this.endpoint + 'CallForServiceInvolvedUnit/?callId=' + this.callService.getActiveCall().id + '&personId=' + id, this.getHttpOptions()).toPromise();
  }

  private addInvolvedUnit(involvedUnit: InvolvedUnitsItem): Promise<any> {
    this.updateModel(involvedUnit);

    console.log('inserting person', JSON.stringify(involvedUnit));

    return this.http.post<any>(this.endpoint + 'CallForServiceInvolvedUnit', JSON.stringify(involvedUnit), this.getHttpOptions()).toPromise();
  }

  private updateInvolvedUnit(id, involvedUnit: InvolvedUnitsItem): Promise<any> {
    return this.http.put(this.endpoint + 'CallForServiceInvolvedUnit?callId=' + this.callService.getActiveCall().id + '&personId=' + id, JSON.stringify(involvedUnit), this.getHttpOptions()).toPromise()
    .then(res => {
      console.log(JSON.stringify(res));
      return res;
    });
  }

  private deleteInvolvedUnit(id): Promise<any> {
    return this.http.delete<any>(this.endpoint + 'CallForServiceInvolvedUnit?callId=' + this.callService.getActiveCall().id + '&personId=' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: InvolvedUnitsItem) {
    model.callForServiceId = this.callService.getActiveCall().id;
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toISOString();
    model.callForServiceUnit.createdUserId = this.authService.getUser().id;
    model.callForServiceUnit.effectiveDateTime = new Date().toISOString();
  }

}
