import { Injectable } from '@angular/core';
import { WreckerRotationDAO } from '../../dao/callDetails/WreckerRotationDAO.service';
import DataSource from 'devextreme/data/data_source';
import { WreckerServiceDAO } from '../../dao/callDetails/WreckerServiceDAO.service';

@Injectable({
  providedIn: 'root'
})
export class WreckerService {

  constructor(private wreckerRotationDAO: WreckerRotationDAO, private wreckerServiceDAO: WreckerServiceDAO) { }

  public getNextRotationId(rotationId: number): Promise<any> {
    return this.wreckerRotationDAO.getNextRotation(rotationId);
  }

  public getWreckerRoationList(): DataSource {
    return this.wreckerRotationDAO.getWreckerRotationDS();
  }

  public getWreckerServiceList(): DataSource {
    return this.wreckerServiceDAO.getWreckerServiceDS();
  }
}
