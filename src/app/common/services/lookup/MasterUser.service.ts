import { Injectable } from '@angular/core';
import { MasterUser } from '../../models/master/MasterUser';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../models/enums/URL.enum';
@Injectable({
  providedIn: 'root'
})
export class MasterUserService {

  users: MasterUser[];

  constructor(private httpClient: HttpClient) {}

  initialize(): Promise<any> {
    const promise = this.httpClient.get<MasterUser[]>(URL.MASTER_USER_ADDRESS)
      .toPromise()
      .then(settings => {
        console.log('Master User Service Settings from API: ', settings);

        this.users = settings;

        return settings;
    });

    return promise;
  }

}
