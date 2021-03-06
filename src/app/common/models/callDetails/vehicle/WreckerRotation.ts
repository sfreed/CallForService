import { BaseModel } from '../../BaseModel';

export class WreckerRotation extends BaseModel {
  id: number;
  rotationDescription: string;
  currentWreckerRotation: number;
  totalWreckerServices: number;
  wreckerRotationStart: string;
  wreckerRotationInterval: number;
}
