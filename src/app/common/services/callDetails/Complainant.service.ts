import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ComplainantDAO } from '../../dao/callDetails/ComplainantDAO.service';

@Injectable({
  providedIn: 'root'
})
export class ComplainantService {

  constructor(private complainantDAO: ComplainantDAO) { }

  getComplainantsList(): DataSource {
    return this.complainantDAO.getComplainantsDS();
  }

}
