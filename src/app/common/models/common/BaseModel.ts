import { ErrorsItem } from './ErrorsItem';

export class BaseModel {
  effectiveDateTime: string;
  isUserEditable: boolean;
  createdUserId: string;
  Errors: ErrorsItem[];
}
