import { CallForServiceUnit } from './CallForServiceUnit';

export class InvolvedUnit {
  id: number;
  callForServiceId: number;
  callForServiceUnit: CallForServiceUnit;
  isPrimaryUnit: boolean;
  callForServiceDateTime: string;
  dispatchDateTime?: string;
  enrouteDateTime?: string;
  arrivedDateTime?: string;
  atPatientDateTime?: string;
  firstShockDateTime?: string;
  extricationDateTime?: string;
  underControlDateTime?: string;
  leaveSceneDateTime?: string;
  arrivedStationDateTime?: string;
  inserviceDateTime?: string;
  enrouteHospitalMileage?: number;
  arrivedHospitalMileage?: number;
}
