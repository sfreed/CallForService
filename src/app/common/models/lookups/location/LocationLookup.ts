import { Street } from './Street';
import { StreetNameDirection } from './StreetNameDirection';
import { StreetNameSuffix } from './StreetNameSuffix';
import { AddressType } from './AddressType';
import { State } from './State';
import { City } from './City';
import { County } from './County';
import { Country } from './Country';
import { PatrolArea } from './PatrolArea';
import { Zone } from './Zone';

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

