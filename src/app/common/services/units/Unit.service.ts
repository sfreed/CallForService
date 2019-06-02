import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { AvailableUnit } from '../../models/units/AvailableUnit';
import { UnitsDAO } from '../../dao/units/UnitsDao.service';


@Injectable({
  providedIn:  'root'
})
export class UnitService {

  constructor(private unitDao: UnitsDAO) {}

  getActiveUnitsList(): DataSource {
    return this.unitDao.getUnitsDS();
  }

  getInactiveUnitsList(): DataSource {
    return this.unitDao.getUnitsDS();
  }


  changeUnitStatus(unit: AvailableUnit): Promise<any> {
    // status 1 = inactive
    // status 2 = active
    return this.getActiveUnitsList().store().update(unit.id, unit);
    // this.getInactiveUnitsList().store().update(unit.id, unit);
  }
}
