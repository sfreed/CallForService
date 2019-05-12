import { Injectable } from '@angular/core';
import { PersonLookup, Agency, AgencyType, ContactType, Ethnicity, EyeColor, FacialHair, Gender,
         HairColor, HairType, NamePrefix, NameSuffix, OfficerRank, Race, Eyewear } from '../../models/lookups/PersonLookup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../models/enums/URL.enum';

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
