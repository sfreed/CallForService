import { CallForServiceUnit } from '../unit/CallForServiceUnit';
import { BaseModel } from '../common/BaseModel';

export class InvolvedUnitsItem extends BaseModel {
  id: number;
  callForServiceId: number;
  callForServiceUnitId: number;
  callForServiceUnit: CallForServiceUnit;
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
