import { Injectable } from '@angular/core';
import { IdentificationClassDAO } from 'src/app/common/dao/lookups/person/IdentificationClassDAO.service';
import DataSource from 'devextreme/data/data_source';

@Injectable({
  providedIn: 'root'
})
export class IdentificationClassService {

  constructor(private identificationClassDAO: IdentificationClassDAO) {}

  public getIdentificationClassListDS(): DataSource {
    return this.identificationClassDAO.getIdentificationClassListDS();
  }

}
