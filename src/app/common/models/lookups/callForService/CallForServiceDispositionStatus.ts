import { BaseModel } from '../../BaseModel';

export class CallForServiceDispositionStatus extends BaseModel {
  id: number;
  callForServiceStatusDispositionDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
