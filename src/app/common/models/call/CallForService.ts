import { DispatchedByPerson } from './DispatchedByPerson';
import { Location } from './Location';
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
  originatedId: number;
  locationPrimary: Location;
  secondaryLocationLocation: Location;
  complainantPerson: ComplainantPerson;
  typeId: number;
  typePriorityOrder: number;
  isAlertTimeActive: boolean;
  alertTimeInterval: number;
  alertTimeStart: string;
}
