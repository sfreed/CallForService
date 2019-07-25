import { BaseModel } from '../BaseModel';

export class UnitTimes extends BaseModel {
  callForServiceId: number;
  callForServiceUnitId: number;
  dateTimeType: number;
  unitDateTime: string;
  mileageType: number;
  unitMileage: number;
}
