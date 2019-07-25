import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallForService } from '../../models/call/CallForService';
import { URL } from '../../models/common/URL.enum';
import { BaseDAO } from '../BaseDAO';
import { AuthenticationService } from '../../auth/auth.service';
import { DatePipe } from '@angular/common';
import { CloseCall } from '../../models/call/CloseCall';

@Injectable({
  providedIn: 'root'
})
export class CallForServiceCloseCallDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      insert: (call) => {
        return this.closeCall(call);
      },
    });
  }

  public getCallCloseDS(): DataSource {
    const ds = new DataSource({
      store: this.store,
    });

    return ds;
  }

  private closeCall (call: CloseCall): Promise<any> {
    this.updateModel(call);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_CLOSE_CALL_ADDRESS, JSON.stringify(call), this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: CloseCall) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
