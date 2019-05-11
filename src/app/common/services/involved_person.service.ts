import { Injectable } from '@angular/core';
import { InvolvedPersonDAO } from '../dao/InvolvedPersonDao.service';
import DataSource from 'devextreme/data/data_source';
@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonService {

  constructor(private involvedPersonsDao: InvolvedPersonDAO) { }

  getInvolvedPersonList(): DataSource {
    return this.involvedPersonsDao.getInvolvedPersonsDS();
  }

}
