import { AssignedOfficer } from '../assignedOfficer';
import { Note } from '../note';
import { Hospital } from '../sources/Hospital';
import { WreckerService } from '../sources/WreckerService';
import { Vehicle } from '../vehicle';
import { Person } from '../person';
import { Call } from './Call';

export class CallDetail {
  callInfoId: string;
  officers: AssignedOfficer[];
  notes: Note[];
  hospitals: Hospital[];
  wreckers: WreckerService[];
  vehicles: Vehicle[];
  involvedPersons?: Person[];
  call_history: Note[];
}
