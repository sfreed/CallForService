import { BaseModel } from '../../BaseModel';

export class Country extends BaseModel {
  id: number;
  countryISO2Code: string;
  countryISO3Code: string;
  countryISONumericCode: number;
  countryName: string;
  countryOfficialName: string;
  internaationalCallingCode: string;
  isActive: boolean;
  isUserEditable: boolean;
}
