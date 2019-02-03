export interface PersonLookup {
    agency: Agency[];
    agencyType: AgencyType[];
    contactType: ContactType[];
    ethnicity: Ethnicity[];
    eyeColor: EyeColor[];
    eyewear: Eyewear[];
    facialHair: FacialHair[];
    gender: Gender[];
    hairColor: HairColor[];
    hairType: HairType[];
    namePrefix: NamePrefix[];
    nameSuffix: NameSuffix[];
    officerRank: OfficerRank[];
    race: Race[];
}
export interface Agency {
    id: number;
    agencyCode: string;
    agencyName: string;
    agencyTypeCodeId: number;
    ncicCode: string;
    conversionNumber: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface AgencyType {
    id: number;
    agencyTypeCode: string;
    agencyTypeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface ContactType {
    id: number;
    contactTypeCode: string;
    contactTypeCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Ethnicity {
    id: number;
    EthnicityCode: string;
    EthnicityCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface EyeColor {
    id: number;
    eyeColorCode: string;
    eyeColorCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Eyewear {
    id: number;
    eyewearCode: string;
    eyewearCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface FacialHair {
    id: number;
    facialHairCode: string;
    facialHairCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Gender {
    id: number;
    GenderCode: string;
    GenderCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface HairColor {
    id: number;
    hairColorCode: string;
    hairColorCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface HairType {
    id: number;
    hairTypeCode: string;
    hairTypeCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface NamePrefix {
    id: number;
    NamePrefixCode: string;
    NamePrefixCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface NameSuffix {
    id: number;
    NameSuffixCode: string;
    NameSuffixCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface OfficerRank {
    id: number;
    OfficerRankCode: string;
    OfficerRankCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}
export interface Race {
    id: number;
    RaceCode: string;
    RaceCodeDescription: string;
    isActive: boolean;
    isUserEditable: boolean;
}

