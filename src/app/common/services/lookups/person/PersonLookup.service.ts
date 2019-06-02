import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../../models/common/URL.enum';
import { Gender } from '../../../models/lookups/person/Gender';
import { Race } from '../../../models/lookups/person/Race';
import { PersonLookup } from '../../../models/lookups/person/PersonLookup';
import { EyeColor } from 'src/app/common/models/lookups/person/EyeColor';

@Injectable({
  providedIn: 'root'
})
export class PersonLookupService {

  genderList: Gender[];
  raceList: Race[];
  eyeColorList: EyeColor[];

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
        this.eyeColorList = settings.eyeColor;
        this.genderList = settings.gender;

        this.raceList = settings.race;
        return settings;
      });

      return promise;
  }
}
