import { BaseModel } from '../../BaseModel';

export class OfficerRank extends BaseModel {
  id: number;
  officerRank: string;
  officerRankDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
