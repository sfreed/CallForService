
import { WreckerRotation } from '../../callDetails/vehicle/WreckerRotation';
import { CallForServiceHospital } from './CallForServiceHospital';
import { CallForServiceOriginated } from './CallForServiceOriginated';
import { CallForServiceType } from './CallForServiceType';
import { CallForServiceUnitType } from './CallForServiceUnitType';
import { CallForServiceStatus } from './CallForServiceStatus';
import { CallForServiceDispositionStatus } from './CallForServiceDispositionStatus';
import { WreckerService } from '../../callDetails/vehicle/WreckerService';

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

