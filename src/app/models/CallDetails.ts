import { AssignedOfficer } from './assignedOfficer';
import { Note } from './note';
import { Hospital } from './hospital';
import { Wrecker } from './wrecker';
import { Vehicle } from './vehicle';
import { Person } from './person';
import { Call } from './Call';

export class CallDetails {
  callInfoId: string;
  officers: AssignedOfficer[];
  notes: Note[];
  hospitals: Hospital[];
  wreckers: Wrecker[];
  vehicles: Vehicle[];
  involvedPersons?: Person[];
  call_history: Note[];
}
