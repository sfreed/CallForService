import { AssignedOfficer } from './assignedOfficer';
import { Note } from './note';
import { Ambulance } from './ambulance';
import { TowTruck } from './towTruck';
import { Vehicle } from './vehicle';
import { Person } from './person';

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
  officers?: AssignedOfficer[];
  notes?: Note[];
  ambulances?: Ambulance[];
  towTrucks?: TowTruck[];
  complaintants?: Person[];
  vehicles?: Vehicle[];
  involvedPersons?: Person[];
}
