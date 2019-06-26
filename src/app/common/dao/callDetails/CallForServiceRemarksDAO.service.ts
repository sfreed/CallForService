import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { URL } from '../../models/common/URL.enum';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import { CallRemarksItem } from '../../models/callDetails/CallRemark';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceRemarksDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      load: (loadOptions) => {
          return this.getCallsRemarks(loadOptions.select);
      },
      insert: (callRemark: CallRemarksItem) => {
        return this.addCallRemark(callRemark);
      }
    });
  }

  public getCallRemarksListDS(key?): DataSource {
    const ds = new DataSource({
      sort: 'effectiveDateTime',
      store: this.store,
      select: key
    });

    return ds;
  }

  private getCallsRemarks(callID): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_REMARKS_ADDRESS + '?callId=' + callID, this.getHttpOptions()).toPromise()
    .then(results => {
      console.log('call Remarks List', results);
      return results;
    });
  }

  private addCallRemark (call: CallRemarksItem): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_REMARKS_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: CallRemarksItem) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toDateString();
  }

}
