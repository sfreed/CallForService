import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './auth.service';

/**
 * Decides if a route can be activated.
 */
@Injectable() export class AuthGuard implements CanActivate {

    constructor(public authenticationService: AuthenticationService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      console.log('can activate');

        if (this.authenticationService.getUser()) {
            // Signed in.
            return true;
        }

        console.log('can activate2');
        // Stores the attempted URL for redirecting.
        const url: string = state.url;
        this.authenticationService.redirectUrl = url;
        // Not signed in so redirects to signin page.
        this.router.navigate(['/login']);
        return false;
    }
}
