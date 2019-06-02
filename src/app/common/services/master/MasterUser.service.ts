import { Injectable } from '@angular/core';
import { MasterUserDAO } from '../../dao/master/MasterUserDAO.service';
import DataSource from 'devextreme/data/data_source';

@Injectable({
  providedIn: 'root'
})
export class MasterUserService {

  constructor(private masterUserDAO: MasterUserDAO) { }

  getMasterUserList(): DataSource {
    return this.masterUserDAO.getMasterUsersDS();
  }
}
