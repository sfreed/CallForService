import { DispatchedByPerson } from './DispatchedByPerson';
import { LocationPrimary } from './LocationPrimary';
import { SecondaryLocationLocation } from './SecondaryLocationLocation';
import { ComplainantPerson } from './ComplainantPerson';
import { BaseModel } from '../BaseModel';

export class CallForService extends BaseModel {
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
  callForServiceDispositionStatusId: number;
  isAlertTimeActive: boolean;
  alertTimeInterval: number;
  alertTimeStart: string;
  originatedId: number;
  typeId: number;
  typePriorityOrder: number;
}
