import { BaseModel } from '../../BaseModel';

export class Race extends BaseModel {
  id: number;
  race: string;
  raceDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
