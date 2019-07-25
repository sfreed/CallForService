import { Injectable } from '@angular/core';
import { InvolvedUnitDAO } from '../../dao/callDetails/InvolvedUnitDAO.service';
import DataSource from 'devextreme/data/data_source';
import { AvailableUnit } from '../../models/units/AvailableUnit';
import { InvolvedUnitsItem } from '../../models/callDetails/InvolvedUnitItem';
import { CallsService } from '../call/Calls.service';
import { InvolvedUnitTimesDAO } from '../../dao/callDetails/InvolvedUnitTimesDAO.service';
import { DatePipe } from '@angular/common';
import { UnitTimes } from '../../models/units/UnitTimes';

@Injectable({
  providedIn: 'root'
})
export class InvolvedUnitsService {

  constructor(private involvedUnitDao: InvolvedUnitDAO, private involvedUnitTimesDao: InvolvedUnitTimesDAO, private callService: CallsService, private datePipe: DatePipe) { }

  getInvolvedUnitList(): DataSource {
    return this.involvedUnitDao.getInvolvedUnitsDS();
  }

  getInvolvedUnitTimes(): DataSource {
    return this.involvedUnitTimesDao.getInvolvedUnitTimesDS();
  }

  assignUnitToActiveCall(unit: AvailableUnit): Promise<any> {
    unit.currentCall = this.callService.getActiveCall().id;

    const involvedUnit = new InvolvedUnitsItem();
    involvedUnit.callForServiceUnit = unit;
    involvedUnit.callForServiceId = this.callService.getActiveCall().id;
    involvedUnit.callForServiceUnitId = unit.id;
    involvedUnit.isPrimaryUnit = true;
    involvedUnit.callForServiceDateTime = this.callService.getActiveCall().receivedDateTime;
    involvedUnit.dispatchDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');

    console.log('assigning unit' + JSON.stringify(involvedUnit));
    return this.getInvolvedUnitList().store().insert(involvedUnit);
  }

  updateUnitTime(unit: UnitTimes): Promise<any> {
    console.log('updating unit time', unit);
    return this.getInvolvedUnitTimes().store().update([unit.callForServiceId, unit.callForServiceUnitId], unit);

  }

  updateUnit(unit: InvolvedUnitsItem) {
    console.log('updating unit', unit);
    this.involvedUnitDao.getInvolvedUnitsDS().store().update(unit.callForServiceUnitId, unit);

  }
}
