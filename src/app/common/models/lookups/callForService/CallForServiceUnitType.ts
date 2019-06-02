import { BaseModel } from '../../BaseModel';

export class CallForServiceUnitType extends BaseModel {
  id: number;
  unitCode: string;
  unitDescription: string;
  unitImage: string;
  unitColorBackground: string;
  unitColorForground: string;
  isDispatchTime: boolean;
  isEnrouteTime: boolean;
  isArrivedTime: boolean;
  isLeaveSceneTime: boolean;
  isArrivedStationTime: boolean;
  isInServiceTime: boolean;
  isAtPatientTime: boolean;
  isUnderControlTime: boolean;
  isExtricationTime: boolean;
  isFirstShockTime: boolean;
  isEnrouteHospitalMileage: boolean;
  isArrivedHospitalMileage: boolean;
  isActive: boolean;
  isUserEditable: boolean;
}
