import { BaseModel } from '../../BaseModel';

export class CallForServiceUnitDisposition extends BaseModel {
  id: number;
  unitDispositionsTypeCode: string;
  unitDispositionsTypeDescription: string;
}
