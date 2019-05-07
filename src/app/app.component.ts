import { Component } from '@angular/core';
import { AuthenticationService } from './common/auth/auth.service';
import { User } from './common/models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.getUser();
    }
}
