export interface CallForServiceLookup {
  callForServiceHospital: CallForServiceHospital[];
  callForServiceOriginated: CallForServiceOriginated[];
  callForServiceStatus: CallForServiceStatus[];
  callForServiceType: CallForServiceType[];
  callForServiceUnitType: CallForServiceUnitType[];
  callForServiceDispositionStatus: CallForServiceDispositionStatus[];
}
export interface CallForServiceHospital {
  id: number;
  hospitalName: boolean;
  isActive: boolean;
  isUserEditable: boolean;
}
export interface CallForServiceOriginated {
  id: number;
  originatedFrom: string;
  isActive: boolean;
  isUserEditable: boolean;
}
export interface CallForServiceStatus {
  id: number;
  callForServiceStatusDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
export interface CallForServiceDispositionStatus {
  id: number;
  callForServiceStatusDispositionDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
export interface CallForServiceType {
  id: number;
  code: string;
  description: string;
  priorityOrder: number;
  alertTimerActive: boolean;
  alertTimerInterval: number;
  isActive: boolean;
  isUserEditable: boolean;
}
export interface CallForServiceUnitType {
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
