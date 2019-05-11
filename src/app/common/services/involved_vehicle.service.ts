import { Injectable } from '@angular/core';
import { InvolvedVehicleDAO } from '../dao/InvolvedVehicleDAO.service';
import DataSource from 'devextreme/data/data_source';

@Injectable({
  providedIn: 'root'
})
export class InvolvedVehicleService {

  constructor(private involvedVehicleDao: InvolvedVehicleDAO) { }

  getInvolvedPersonList(): DataSource {
    return this.involvedVehicleDao.getInvolvedVehiclesDS();
  }

}
