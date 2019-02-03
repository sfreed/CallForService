export interface LocationLookup {
    addressType: AddressType[];
    city: City[];
    country: Country[];
    county: County[];
    patrolArea: PatrolArea[];
    state: State[];
    street: Street[];
    streetNameDirection: StreetNameDirection[];
    StreetNameSuffix: StreetNameSuffix[];
    Zone: Zone[];
}
export interface AddressType {
    id: number;
    addressTypeCode: string;
    addressTypeName: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface City {
    id: number;
    cityName: string;
    stateCodeId: number;
    zipCode: string;
    isActive: boolean;
    stateCode: StateCode;
}
export interface StateCode {
    id: number;
    stateCode: string;
    stateName: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Country {
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
export interface County {
    id: number;
    countyCode: string;
    countyName: string;
    stateCodeId: number;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface PatrolArea {
    id: number;
    patrolAreaCode: string;
    patrolAreaCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface State {
    id: number;
    stateCode: string;
    stateName: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Street {
    id: number;
    StreetNameSuffixCode: string;
    StreetNameSuffixDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface StreetNameDirection {
    id: number;
    streetNameDirectionalCode: string;
    streetNameDirectionalCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface StreetNameSuffix {
    id: number;
    streetNamePreModifier: string;
    streetNamePreDirectionalCodeId: string;
    streetName: string;
    streetNameSuffixCodeId: string;
    streetNamePostDirectionalCodeId: string;
    streetNamePostModifier: string;
    isUserEditable: boolean;
}
export interface Zone {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

