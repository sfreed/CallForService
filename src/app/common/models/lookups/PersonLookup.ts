import { Agency } from './person/Agency';
import { ContactType } from './person/ContaxtType';
import { AgencyType } from './person/AgencyType';
import { Ethnicity } from './person/Ethnicity';
import { EyeColor } from './person/EyeColor';
import { Eyewear } from './person/EyeWear';
import { FacialHair } from './person/FacialHair';
import { Gender } from './person/Gender';
import { HairColor } from './person/HairColor';
import { HairType } from './person/HairType';
import { NamePrefix } from './person/NamePrefix';
import { NameSuffix } from './person/NameSuffix';
import { OfficerRank } from './person/OfficerRank';
import { Race } from './person/Race';

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
