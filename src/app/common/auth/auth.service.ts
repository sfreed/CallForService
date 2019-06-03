import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../models/common/URL.enum';

@Injectable()
export class AuthenticationService {
    public redirectUrl: string;

    CLIENT_ID = 'CFSClient';
    GRANT_TYPE = 'password';
    TOKEN_USER_NAME = 'applications@courtware.net';
    TOKEN_PASSWORD = 'Courtware@Tz1pbX0JLYLki';

    private currentUser: any;

    constructor(private router: Router, private httpClient: HttpClient) {
      // this.getToken();
    }

    public getToken(): Promise<any> {
      const params: any = {
        client_id: this.CLIENT_ID,
        grant_type: this.GRANT_TYPE,
        username: this.TOKEN_USER_NAME,
        password: this.TOKEN_PASSWORD
      };

      const body: string = this.encodeParams(params);

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      return this.httpClient.post(URL.TOKEN_ENDPOINT, body, { headers: headers })
        .toPromise()
        .then(settings => {
            const responseBody: any = settings;

            if (typeof responseBody.access_token !== 'undefined') {
              localStorage.setItem('id_token', responseBody.access_token);
            }

            return settings;
          }
        );
    }

    /**
     * Tries to sign in the user.
     *
     * @param username: string
     * @param password: string
     * @return The user's data
     */
    public login(username: string, password: string): Promise<any> {
        this.getToken();

        const params: any = {
          userId: username,
          password: password,
          logDateTime: new Date()
        };

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        return this.httpClient.post(URL.USER_LOGIN_ENDPOINT, params, {headers: headers})
          .toPromise()
          .then( settings => {
            console.log('login res: ', settings);

            const responseBody: any = settings;

            if (typeof responseBody !== 'undefined') {
              this.currentUser = responseBody;
            }
          });
    }

    /**
     * Removes user and revokes tokens.
     */
    public logout():  Promise<any> {
        const params: any = {
          userId: this.currentUser.userId,
          password: 'password',
          logDateTime: new Date()
        };

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const tkn = localStorage.getItem('id_token');
        console.log('logging out ', tkn);

        localStorage.removeItem('id_token');

        console.log('removing tkn ', localStorage.getItem('id_token'));

        return this.httpClient.post(URL.USER_LOGOUT_ENDPOINT, params, {headers: headers})
          .toPromise()
          .then( settings => {
              console.log('logout res: ', settings);

              const responseBody: any = settings;

              if (typeof responseBody !== 'undefined') {
                console.log('Logged out ', responseBody);
                this.currentUser = responseBody;
              }

              this.redirectUrl = null;

              this.currentUser = '';

              this.router.navigate(['/login']);
            }
          );
    }

    /**
     * Gets user's data.
     *
     * @return The user's data
     */
    public getUser(): any {
        return this.currentUser;
    }

    /**
     * // Encodes the parameters.
     *
     * @param params The parameters to be encoded
     * @return The encoded parameters
     */
    private encodeParams(params: any): string {
        let body = '';

        for (const key in params) {
          if (params) {
            if (body.length) {
                body += '&';
            }
            body += key + '=';
            body += encodeURIComponent(params[key]);
          }
        }

        return body;
    }

}
