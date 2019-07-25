import { Injectable } from '@angular/core';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../models/common/URL.enum';
import { DatePipe } from '@angular/common';
import { UnitTimes } from '../../models/units/UnitTimes';

@Injectable({
  providedIn: 'root'
})
export class InvolvedUnitTimesDAO extends BaseDAO {
  constructor(private http: HttpClient, private datePipe: DatePipe, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: ['callForServiceId', 'callForServiceUnitId'],
      update: (key, unit: UnitTimes) => {
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

  private updateInvolvedUnitTime(id, unit: UnitTimes): Promise<any> {
    console.log('updating unit3', unit);

    this.updateModel(unit);

    return this.http.put(URL.CALL_FOR_SERVICE_INVOLVED_UNIT_TIMES_ADDRESS, JSON.stringify(unit), this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: UnitTimes) {
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    model.createdUserId = this.authService.getUser().id;
  }
}
