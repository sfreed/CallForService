


import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { CallForServiceRemarksDAO } from '../../dao/callDetails/CallForServiceRemarksDAO.service';
import { CallsService } from '../call/Calls.service';
import { CallRemarksItem } from '../../models/callDetails/CallRemark';
import { AuthenticationService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RemarksService {

  constructor(private remarksDao: CallForServiceRemarksDAO, public callService: CallsService, public authService: AuthenticationService) { }

  public getCallRemarksDS(): DataSource {
    return this.remarksDao.getCallRemarksListDS(this.callService.getActiveCall().id);
  }

  public saveCallRemark(remark): Promise<any> {
    const callRemark = new CallRemarksItem();
    callRemark.callForServiceId = this.callService.getActiveCall().id;
    callRemark.createdUserId = this.authService.getUser().personId;
    callRemark.effectiveDateTime = new Date().toDateString();
    callRemark.remarks = remark;

     return this.remarksDao.getCallRemarksListDS().store().insert(callRemark);
  }

}
