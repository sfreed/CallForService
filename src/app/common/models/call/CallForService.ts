import { DispatchedByPerson } from './DispatchedByPerson';
import { LocationPrimary } from './LocationPrimary';
import { SecondaryLocationLocation } from './SecondaryLocationLocation';
import { ComplainantPerson } from './ComplainantPerson';
import { BaseModel } from '../common/BaseModel';

export class CallForService extends BaseModel {

  id: number;
  isVoid: boolean;
  receivedDateTime: string;
  dispatchedDateTime: string;
  onHoldDateTime: string;
  closedDateTime: string;
  dispatchedByPerson: DispatchedByPerson;
  originatedId: number;
  locationPrimary: LocationPrimary;
  secondaryLocationLocation: SecondaryLocationLocation;
  complainantPerson: ComplainantPerson;
  typeId: number;
  typePriorityOrder: number;
  isAlertTimeActive: boolean;
  alertTimeInterval: number;
  alertTimeStart: string;
}
