import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './common/auth/auth.guard';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
