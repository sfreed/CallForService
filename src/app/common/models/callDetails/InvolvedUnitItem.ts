import { AvailableUnit } from '../units/AvailableUnit';
import { BaseModel } from '../BaseModel';

export class InvolvedUnitsItem extends BaseModel {
  id: number;
  callForServiceId: number;
  callForServiceUnitId: number;
  callForServiceUnit: AvailableUnit;
  isPrimaryUnit: boolean;
  callForServiceDateTime: string;
  dispatchDateTime: string;
  enrouteDateTime: string;
  arrivedDateTime: string;
  atPatientDateTime: string;
  firstShockDateTime: string;
  extricationDateTime: string;
  underControlDateTime: string;
  leaveSceneDateTime: string;
  arrivedStationDateTime: string;
  inserviceDateTime: string;
  enrouteHospitalMileage: number;
  arrivedHospitalMileage: number;
}
