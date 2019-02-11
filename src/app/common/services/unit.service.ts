import { Injectable } from '@angular/core';
import { DispatcherService } from './dispatcher.service';
import { DatasourcesService } from '../datasources/Datasources.service';
import { CallForServiceUnit } from '../models/call/CallForServiceUnit';

@Injectable({
  providedIn:  'root'
})
export class UnitService {

  constructor(private dispatcherHistory: DispatcherService, public dsService: DatasourcesService) {}

  changeUnitStatus(unit: CallForServiceUnit) {
    if (unit.active) {
      unit.active = false;

      this.dsService.getActiveUnitsList().store().push(([{ type: 'remove', key: unit.id }]));
      this.dsService.getInactiveUnitsList().store().push(([{ type: 'insert', data: unit }]));
    } else {
      unit.active = true;

      this.dsService.getInactiveUnitsList().store().push(([{ type: 'remove', key: unit.id }]));
      this.dsService.getActiveUnitsList().store().push(([{ type: 'insert', data: unit }]));
    }
  }
}
