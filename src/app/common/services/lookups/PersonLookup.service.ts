import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../models/common/URL.enum';
import { Agency } from '../../models/lookups/person/Agency';
import { AgencyType } from '../../models/lookups/person/AgencyType';
import { ContactType } from '../../models/lookups/person/ContaxtType';
import { Ethnicity } from '../../models/lookups/person/Ethnicity';
import { EyeColor } from '../../models/lookups/person/EyeColor';
import { Eyewear } from '../../models/lookups/person/EyeWear';
import { FacialHair } from '../../models/lookups/person/FacialHair';
import { Gender } from '../../models/lookups/person/Gender';
import { HairColor } from '../../models/lookups/person/HairColor';
import { HairType } from '../../models/lookups/person/HairType';
import { NamePrefix } from '../../models/lookups/person/NamePrefix';
import { NameSuffix } from '../../models/lookups/person/NameSuffix';
import { OfficerRank } from '../../models/lookups/person/OfficerRank';
import { Race } from '../../models/lookups/person/Race';
import { PersonLookup } from '../../models/lookups/PersonLookup';

@Injectable({
  providedIn: 'root'
})
export class PersonLookupService {
  agencyList: Agency[];
  agencyTypeList: AgencyType[];
  contactTypeList: ContactType[];
  ethnicityList: Ethnicity[];
  eyeColorList: EyeColor[];
  eyeWearList: Eyewear[];
  facialHairList: FacialHair[];
  genderList: Gender[];
  hairColorList: HairColor[];
  hairTypeList: HairType[];
  namePrefixList: NamePrefix[];
  nameSuffixList: NameSuffix[];
  officerRankList: OfficerRank[];
  raceList: Race[];


  constructor(private httpClient: HttpClient) {}

  initialize(): Promise<PersonLookup> {
    const promise = this.httpClient.get<PersonLookup>(URL.PERSON_LOOKUP_SERVICE_ADDRESS, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('id_token')
      })
    })
      .toPromise()
      .then(settings => {
        console.log('Person Settings from API: ', settings);
        this.agencyList = settings.agency;
        this.agencyTypeList = settings.agencyType;
        this.contactTypeList = settings.contactType;
        this.ethnicityList = settings.ethnicity;
        this.eyeColorList = settings.eyeColor;
        this.eyeWearList = settings.eyewear;
        this.facialHairList = settings.facialHair;
        this.genderList = settings.gender;
        this.hairColorList = settings.hairColor;
        this.hairTypeList = settings.hairType;
        this.namePrefixList = settings.namePrefix;
        this.nameSuffixList = settings.nameSuffix;
        this.officerRankList = settings.officerRank;
        this.raceList = settings.race;
        return settings;
      });

      return promise;
  }
}
