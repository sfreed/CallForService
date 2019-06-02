import { Injectable } from '@angular/core';
import { InvolvedVehicleDAO } from '../../dao/callDetails/InvolvedVehicleDAO.service';
import DataSource from 'devextreme/data/data_source';

@Injectable({
  providedIn: 'root'
})
export class InvolvedVehicleService {

  constructor(private involvedVehicleDao: InvolvedVehicleDAO) { }

  getInvolvedVehicleList(): DataSource {
    return this.involvedVehicleDao.getInvolvedVehiclesDS();
  }

}
