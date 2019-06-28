import { Injectable } from '@angular/core';
import { BaseDAO } from '../BaseDAO';
import { CallsService } from '../../services/call/Calls.service';
import { AuthenticationService } from '../../auth/auth.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { InvolvedUnitsItem } from '../../models/callDetails/InvolvedUnitItem';
import { URL } from '../../models/common/URL.enum';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InvolvedUnitDAO extends BaseDAO {

  constructor(private http: HttpClient, private callService: CallsService, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: ['callForServiceId', 'callForServiceUnitId'],
      byKey: (key) => {
        return this.getInvolvedUnit(key);
      },
      load: () => {
        return this.getInvolvedUnits();
      },
      insert: (unit) => {
        return this.addInvolvedUnit(unit);
      },
      update: (key, unit: InvolvedUnitsItem) => {
        console.log('updating unit2', unit);
        return this.updateInvolvedUnit(key, unit);
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
    return this.http.get<any>(URL.CALL_FOR_SERVICE_INVOLVED_UNIT_ADDRESS + '?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise()
      .then(results => {
        console.log('involved Units List', results);
        return results;
      });
  }
  private getInvolvedUnit(id): Promise<any> {
    return this.http.get<any>(URL.CALL_FOR_SERVICE_INVOLVED_UNIT_ADDRESS + '?callId=' + this.callService.getActiveCall().id + '&personId=' + id, this.getHttpOptions()).toPromise();
  }

  private addInvolvedUnit(unit: InvolvedUnitsItem): Promise<any> {
    this.updateModel(unit);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_INVOLVED_UNIT_ADDRESS, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  private updateInvolvedUnit(id, unit: InvolvedUnitsItem): Promise<any> {
    console.log('updating unit3', unit);

    this.updateModel(unit);

    return this.http.put(URL.CALL_FOR_SERVICE_INVOLVED_UNIT_ADDRESS + '?callId=' + this.callService.getActiveCall().id + '&personId=' + id, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  private deleteInvolvedUnit(id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_INVOLVED_UNIT_ADDRESS + '?callId=' + this.callService.getActiveCall().id + '&personId=' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: InvolvedUnitsItem) {
    model.callForServiceId = this.callService.getActiveCall().id;
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    model.callForServiceUnit.createdUserId = this.authService.getUser().id;
    model.callForServiceUnit.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }
}
