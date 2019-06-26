import { Injectable } from '@angular/core';
import { InvolvedUnitDAO } from '../../dao/callDetails/InvolvedUnitDAO.service';
import DataSource from 'devextreme/data/data_source';
import { AvailableUnit } from '../../models/units/AvailableUnit';
import { InvolvedUnitsItem } from '../../models/callDetails/InvolvedUnitItem';
import { CallsService } from '../call/Calls.service';
import { InvolvedUnitTimesDAO } from '../../dao/callDetails/InvolvedUnitTimesDAO.service';

@Injectable({
  providedIn: 'root'
})
export class InvolvedUnitsService {

  constructor(private involvedUnitDao: InvolvedUnitDAO, private involvedUnitTimesDao: InvolvedUnitTimesDAO, private callService: CallsService) { }

  getInvolvedUnitList(): DataSource {
    return this.involvedUnitDao.getInvolvedUnitsDS();
  }

  getInvolvedUnitTimes(): DataSource {
    return this.involvedUnitTimesDao.getInvolvedUnitTimesDS();
  }

  assignUnitToActiveCall(unit: AvailableUnit): Promise<any> {
    const involvedUnit = new InvolvedUnitsItem();
    involvedUnit.callForServiceUnit = unit;
    involvedUnit.callForServiceId = this.callService.getActiveCall().id;
    involvedUnit.callForServiceUnitId = unit.id;
    involvedUnit.isPrimaryUnit = true;
    involvedUnit.callForServiceDateTime = this.callService.getActiveCall().receivedDateTime;
    involvedUnit.dispatchDateTime = new Date().toDateString();

    console.log('assigning unit' + JSON.stringify(involvedUnit));
    return this.getInvolvedUnitList().store().insert(involvedUnit);
  }

  updateUnitTime(unit: InvolvedUnitsItem) {
    console.log('updating unit0', unit);
    this.getInvolvedUnitTimes().store().update([unit.callForServiceId, unit.callForServiceUnitId], unit);

  }
}
