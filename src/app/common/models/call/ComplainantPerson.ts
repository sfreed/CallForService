import { BaseModel } from '../BaseModel';
import { InternalNgModuleRef } from '@angular/core/src/linker/ng_module_factory';

export class ComplainantPerson extends BaseModel {
  id: number;
  callForServiceId: number;
  namePrefixCodeId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  homePhoneNumber: string;
  workPhoneNumber: string;
  mobilePhoneNumber: string;
  nameSuffixCodeId: number;
  sortName: string;
}
