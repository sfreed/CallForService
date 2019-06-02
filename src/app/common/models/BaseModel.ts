import { ErrorsItem } from './common/ErrorsItem';


export class BaseModel {
  isActive: boolean;
  effectiveDateTime: string;
  isUserEditable: boolean;
  createdUserId: string;
  Errors: ErrorsItem[];
}
