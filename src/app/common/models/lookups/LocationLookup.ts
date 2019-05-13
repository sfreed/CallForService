import { BaseModel } from '../common/BaseModel';

export interface LocationLookup {
    addressType: AddressType[];
    city: City[];
    country: Country[];
    county: County[];
    patrolArea: PatrolArea[];
    state: State[];
    street: Street[];
    streetNameDirection: StreetNameDirection[];
    streetNameSuffix: StreetNameSuffix[];
    zone: Zone[];
}
export interface AddressType extends BaseModel {
    id: number;
    addressTypeCode: string;
    addressTypeName: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface City extends BaseModel {
    id: number;
    cityName: string;
    stateCodeId: number;
    zipCode: string;
    isActive: boolean;
    stateCode: StateCode;
}
export interface StateCode extends BaseModel {
    id: number;
    stateCode: string;
    stateName: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Country extends BaseModel {
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
export interface County extends BaseModel {
    id: number;
    countyCode: string;
    countyName: string;
    stateCodeId: number;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface PatrolArea extends BaseModel {
    id: number;
    patrolAreaCode: string;
    patrolAreaCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface State extends BaseModel {
    id: number;
    stateCode: string;
    stateName: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Street extends BaseModel {
    id: number;
    StreetNameSuffixCode: string;
    StreetNameSuffixDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface StreetNameDirection extends BaseModel {
    id: number;
    streetNameDirectionalCode: string;
    streetNameDirectionalCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface StreetNameSuffix extends BaseModel {
    id: number;
    streetNamePreModifier: string;
    streetNamePreDirectionalCodeId: string;
    streetName: string;
    streetNameSuffixCodeId: string;
    streetNamePostDirectionalCodeId: string;
    streetNamePostModifier: string;
    isUserEditable: boolean;
}
export interface Zone extends BaseModel {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

