import { Injectable } from '@angular/core';
import { WreckerRotationDAO } from '../../dao/callDetails/WreckerRotationDAO.service';

@Injectable({
  providedIn: 'root'
})
export class WreckerRotationService {

  constructor(private wreckerRotationDAO: WreckerRotationDAO) { }

  public getNextRotationId(rotationId: number): number {
    let returnVal = 0;

    returnVal = 1;

    this.wreckerRotationDAO.getWreckerRotationDS().store().byKey(rotationId).then(results => console.log('results, results'));

    return returnVal;
  }
}
