import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { UnitDispositionDAO } from 'src/app/common/dao/lookups/callForService/UnitDispositionDAO.service';

@Injectable({
  providedIn: 'root'
})
export class UnitDispositionService  {

  constructor(private unitDispositionDAO: UnitDispositionDAO) {}

  public getUnitDispositionListDS(): DataSource {
    return this.unitDispositionDAO.getUnitDispositionListDS();
  }
}
