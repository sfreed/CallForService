
import { WreckerRotation } from '../callDetails/vehicle/WreckerRotation';
import { CallForServiceHospital } from './callForService/CallForServiceHospital';
import { CallForServiceOriginated } from './callForService/CallForServiceOriginated';
import { CallForServiceType } from './callForService/CallForServiceType';
import { CallForServiceUnitType } from './callForService/CallForServiceUnitType';
import { CallForServiceStatus } from './callForService/CallForServiceStatus';
import { CallForServiceDispositionStatus } from './callForService/CallForServiceDispositionStatus';
import { WreckerService } from '../callDetails/vehicle/WreckerService';

export interface CallForServiceLookup {
  callForServiceHospital: CallForServiceHospital[];
  callForServiceOriginated: CallForServiceOriginated[];
  callForServiceStatus: CallForServiceStatus[];
  callForServiceType: CallForServiceType[];
  callForServiceUnitType: CallForServiceUnitType[];
  callForServiceDispositionStatus: CallForServiceDispositionStatus[];
  wreckerService: WreckerService[];
  wreckerRotation: WreckerRotation[];
}

