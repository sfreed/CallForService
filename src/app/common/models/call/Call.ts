import { DispatchedByPerson } from './DispatchedByPerson';
import { LocationPrimary } from './LocationPrimary';
import { SecondaryLocationLocation } from './SecondaryLocationLocation';
import { ComplainantPerson } from './ComplainantPerson';

export class Call {
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

}
