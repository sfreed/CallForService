import { Street } from './location/Street';
import { StreetNameDirection } from './location/StreetNameDirection';
import { StreetNameSuffix } from './location/StreetNameSuffix';
import { AddressType } from './location/AddressType';
import { State } from './location/State';
import { City } from './location/City';
import { County } from './location/County';
import { Country } from './location/Country';
import { PatrolArea } from './location/PatrolArea';
import { Zone } from './location/Zone';

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

