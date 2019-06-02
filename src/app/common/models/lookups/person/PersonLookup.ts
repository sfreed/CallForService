import { Agency } from '../../common/Agency';
import { ContactType } from './ContactType';
import { AgencyType } from '../../common/AgencyType';
import { Ethnicity } from './Ethnicity';
import { EyeColor } from './EyeColor';
import { Eyewear } from './EyeWear';
import { FacialHair } from './FacialHair';
import { Gender } from './Gender';
import { HairColor } from './HairColor';
import { HairType } from './HairType';
import { NamePrefix } from './NamePrefix';
import { NameSuffix } from './NameSuffix';
import { OfficerRank } from './OfficerRank';
import { Race } from './Race';

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
