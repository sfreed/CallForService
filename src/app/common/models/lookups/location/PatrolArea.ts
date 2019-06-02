import { BaseModel } from '../../BaseModel';

export class PatrolArea extends BaseModel {
  id: number;
  patrolAreaCode: string;
  patrolAreaCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
