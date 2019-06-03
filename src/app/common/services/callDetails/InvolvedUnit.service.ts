import { Injectable } from '@angular/core';
import { InvolvedUnitDAO } from '../../dao/callDetails/InvolvedUnitDAO.service';
import DataSource from 'devextreme/data/data_source';
import { AvailableUnit } from '../../models/units/AvailableUnit';
import { InvolvedUnitsItem } from '../../models/callDetails/InvolvedUnitItem';
import { CallsService } from '../call/Calls.service';

@Injectable({
  providedIn: 'root'
})
export class InvolvedUnitsService {

  constructor(private involvedUnitDao: InvolvedUnitDAO, private callService: CallsService) { }

  getInvolvedUnitList(): DataSource {
    return this.involvedUnitDao.getInvolvedUnitsDS();
  }

  assignUnitToActiveCall(unit: AvailableUnit): boolean {
    const involvedUnit = new InvolvedUnitsItem();
    involvedUnit.callForServiceUnit = unit;
    involvedUnit.callForServiceId = this.callService.getActiveCall().id;
    involvedUnit.isPrimaryUnit = true;
    involvedUnit.callForServiceDateTime = this.callService.getActiveCall().receivedDateTime;
    involvedUnit.dispatchDateTime = new Date().toISOString();

    console.log('assigning unit' + JSON.stringify(involvedUnit));
    this.getInvolvedUnitList().store().insert(involvedUnit);

    return true;
  }
}
