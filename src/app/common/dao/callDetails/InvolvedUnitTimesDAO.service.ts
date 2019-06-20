import { Injectable } from '@angular/core';
import { BaseDAO } from '../BaseDAO';
import { CallsService } from '../../services/call/Calls.service';
import { AuthenticationService } from '../../auth/auth.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { InvolvedUnitsItem } from '../../models/callDetails/InvolvedUnitItem';
import { URL } from '../../models/common/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class InvolvedUnitTimesDAO extends BaseDAO {
  constructor(private http: HttpClient, private callService: CallsService, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: ['callForServiceId', 'callForServiceUnitId'],
      update: (key, unit: InvolvedUnitsItem) => {
        console.log('updating unit2', unit);
        return this.updateInvolvedUnitTime(key, unit);
      }
    });
  }

  public getInvolvedUnitTimesDS(): DataSource {
    const ds =  new DataSource({
      store: this.store
    });

    return ds;
  }

  private updateInvolvedUnitTime(id, unit: InvolvedUnitsItem): Promise<any> {
    console.log('updating unit3', unit);

    this.updateModel(unit);

    return this.http.put(URL.CALL_FOR_SERVICE_INVOLVED_UNIT_TIMES_ADDRESS, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: InvolvedUnitsItem) {
    model.effectiveDateTime = new Date().toISOString();
    model.callForServiceUnit.effectiveDateTime = new Date().toISOString();
  }
}
