import { Injectable } from '@angular/core';
import { HospitalDAO } from '../../dao/common/HospitalDAO.service';
import DataSource from 'devextreme/data/data_source';
import { AgencyDAO } from '../../dao/common/AgencyDAO.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private hospitalDAO: HospitalDAO, private agencyDAO: AgencyDAO) { }

  getHospitalService(): DataSource {
    return this.hospitalDAO.getHospitalListDS();
  }

  getAgencyList(): DataSource {
    return this.agencyDAO.getAgencyListDS();
  }

}
