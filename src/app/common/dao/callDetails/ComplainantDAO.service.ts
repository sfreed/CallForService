import { Injectable } from '@angular/core';
import { BaseDAO } from '../BaseDAO';
import { HttpClient } from '@angular/common/http';
import { CallsService } from '../../services/call/Calls.service';
import { AuthenticationService } from '../../auth/auth.service';
import { InvolvedPersonItem } from '../../models/callDetails/InvolvedPersonItem';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/common/URL.enum';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ComplainantDAO extends BaseDAO {

  constructor(private http: HttpClient, private callService: CallsService, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      byKey: (key) => {
        return this.getComplainant(key);
      },
      load: () => {
        return this.getComplainants();
      },
      insert: (person) => {
        return this.addComplainant(person);
      },
      update: (key, person: InvolvedPersonItem) => {
        return this.updateComplainant(key, person);
      },
      remove: (key) => {
          return this.deleteComplainant(key);
      }
    });
  }

  public getComplainantsDS(): DataSource {
    const ds =   new DataSource({
      store: this.store
    });

    return ds;
  }

  private getComplainants(): Promise<any> {
    return this.http.get<any>(URL.CALL_FOR_SERVICE_COMPLAINANT_ADDRESS + '?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise()
      .then(results => {
        console.log('Complainant List', results);
        return results;
      });
  }
  private getComplainant(id): Promise<any> {
    return this.http.get<any>(URL.CALL_FOR_SERVICE_COMPLAINANT_ADDRESS + '?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise();
  }

  private addComplainant (complainant: InvolvedPersonItem): Promise<any> {
    this.updateModel(complainant);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_COMPLAINANT_ADDRESS, JSON.stringify(complainant), this.getHttpOptions()).toPromise();
  }

  private updateComplainant (id, complainant: InvolvedPersonItem): Promise<any> {
    this.updateModel(complainant);

    return this.http.put(URL.CALL_FOR_SERVICE_COMPLAINANT_ADDRESS + '?callId=' + this.callService.getActiveCall().id, JSON.stringify(complainant), this.getHttpOptions()).toPromise();
  }

  private deleteComplainant (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_COMPLAINANT_ADDRESS + '?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: InvolvedPersonItem) {
    model.callForServiceId = this.callService.getActiveCall().id;
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    if (model.involvedPerson) {
      model.involvedPerson.createdUserId = this.authService.getUser().id;
      model.involvedPerson.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    }

    if (model.involvedPerson) {
      model.involvedPerson.location.createdUserId = this.authService.getUser().id;
      model.involvedPerson.location.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    }
  }

}
