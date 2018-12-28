import { Officer } from './officer';

export class Call {
  id: string;
  date: Date;
  time: string;
  dispatcher_name: string;
  call_type: string;
  address: string;
  city: string;
  state: string;
  caller_name: string;
  caller_phone_number: string;
  officers: Officer[];
}
