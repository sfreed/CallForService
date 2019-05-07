import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './apps/core/home/home.component';
import { AuthGuard } from './common/auth/auth.guard';
import { LoginComponent } from './apps/core/login/login.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
