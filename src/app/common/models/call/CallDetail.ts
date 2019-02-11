import { InvolvedPerson } from './InvolvedPerson';
import { InvolvedUnit } from './InvolvedUnit';
import { InvolvedVehicle } from './InvolvedVehicle';
import { CallRemark } from './CallRemark';

export class CallDetail {
  id: number;
  involvedPersons: InvolvedPerson[];
  involvedUnits: InvolvedUnit[];
  involvedVehicles: InvolvedVehicle[];
  callRemarks: CallRemark[];
}
