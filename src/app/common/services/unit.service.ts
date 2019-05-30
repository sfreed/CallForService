import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { CallForServiceUnit } from '../models/unit/CallForServiceUnit';
import { UnitsDao } from '../dao/UnitsDao.service';


@Injectable({
  providedIn:  'root'
})
export class UnitService {

  constructor(private unitDao: UnitsDao) {}

  getActiveUnitsList(): DataSource {
    return this.unitDao.getUnitsDS();
  }

  getInactiveUnitsList(): DataSource {
    return this.unitDao.getUnitsDS();
  }


  changeUnitStatus(unit: CallForServiceUnit) {
    // status 1 = inactive
    // status 2 = active
    this.getActiveUnitsList().store().update(unit.id, unit);
    this.getInactiveUnitsList().store().update(unit.id, unit);
  }
}
