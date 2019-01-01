import { Officer } from './officer';
import { AssignedOfficer } from './assignedOfficer';

export class Call {
  id: number;
  date: string;
  time: string;
  dispatcher_name: string;
  call_type: string;
  address: string;
  city: string;
  state: string;
  caller_name: string;
  caller_phone_number: string;
  officers: AssignedOfficer[];
}
