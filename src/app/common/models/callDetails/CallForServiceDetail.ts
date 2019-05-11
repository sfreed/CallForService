import { BaseModel } from '../common/BaseModel';
import { DispatchedByPerson } from '../call/DispatchedByPerson';
import { LocationPrimary } from '../call/LocationPrimary';
import { SecondaryLocationLocation } from '../call/SecondaryLocationLocation';
import { ComplainantPerson } from '../call/ComplainantPerson';
import { InvolvedUnitsItem } from './InvolvedUnitItem';
import { InvolvedVehiclesItem } from './InvolvedVehicleItem';
import { CallRemarksItem } from './CallRemark';
import { ApprovalPerson } from './ApprovalPerson';
import { InvolvedPersonItem } from './InvolvedPersonItem';

export class CallForServiceDetails extends BaseModel {
  id: number;
  isVoid: boolean;
  receivedDateTime: string;
  dispatchedDateTime: string;
  onHoldDateTime: string;
  closedDateTime: string;
  dispatchedByPerson: DispatchedByPerson;
  dispatchOriginatedId: number;
  locationPrimary: LocationPrimary;
  secondaryLocationLocation: SecondaryLocationLocation;
  complainantPerson: ComplainantPerson;
  callForServiceTypeId: number;
  callForServiceCodePriorityOrder: number;
  callForServiceStatusId: number;
  isAlertTimeActive: boolean;
  alertTimeInterval: number;
  alertTimeStart: string;
  approvalStatus: number;
  approvalDateTime: string;
  approvalPerson: ApprovalPerson;
  involvedPersons: InvolvedPersonItem[];
  involvedUnits: InvolvedUnitsItem[];
  involvedVehicles: InvolvedVehiclesItem[];
  callRemarks: CallRemarksItem[];
}
