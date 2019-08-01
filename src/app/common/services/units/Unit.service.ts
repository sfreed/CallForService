import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { AvailableUnit } from '../../models/units/AvailableUnit';
import { UnitsDAO } from '../../dao/units/UnitsDao.service';
import { UnitTypeTypeDAO } from '../../dao/units/UnitTypeDAO.service';


@Injectable({
  providedIn:  'root'
})
export class UnitService {

  constructor(private unitDao: UnitsDAO, private unitTypeDAO: UnitTypeTypeDAO) {}

  getCurrentActiveUnitsDS(): DataSource {
    return this.unitDao.getCurrentActiveUnitsDS();
  }

  getActiveUnitsList(): DataSource {
    return this.unitDao.getActiveUnitsDS();
  }

  getInactiveUnitsList(): DataSource {
    return this.unitDao.getInactiveUnitsDS();
  }


  getUnitTypeList(): DataSource {
    return this.unitTypeDAO.getUnitTypesDS();
  }

  changeUnitStatus(unit: AvailableUnit): Promise<any> {
    // status 1 = inactive
    // status 2 = active
    return this.getActiveUnitsList().store().update(unit.id, unit);
    // this.getInactiveUnitsList().store().update(unit.id, unit);
  }
}
