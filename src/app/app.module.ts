import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule, DxTabPanelModule } from 'devextreme-angular';
import { HeaderComponent } from './core/header/header.component';
import { AdminHospitalComponent } from './core/sources/adminHospital/adminHospital.component';
import { AdminAgencyComponent } from './core/sources/adminAgency/adminAgency.component';
import { AdminAvilableUnitsComponent } from './core/sources/adminAvilableUnits/adminAvilableUnits.component';
import { AdminDispatchersComponent } from './core/sources/adminDispatchers/adminDispatchers.component';
import { AdminUnitsComponent } from './core/sources/adminUnits/adminUnits.component';
import { AddressTypeComponent } from './core/types/addressType/addressType.component';
import { AgencyTypeComponent } from './core/types/agencyType/agencyType.component';
import { ContactTypeComponent } from './core/types/contactType/contactType.component';
import { OfficerRankComponent } from './core/types/officerRank/officerRank.component';
import { TypesDisplayComponent } from './core/types/typesDisplay.component';
import { UnitTypeComponent } from './core/types/unitType/unitType.component';
import { AppLoadModule } from './common/init/app_load.module';
import { SplashScreenComponent } from './core/splash-screen/splash-screen.component';
import { HomeComponent } from './core/home/home.component';
import { routing } from './app.routing';

import { JwtInterceptor } from './common/auth/jwt.interceptor';
import { ErrorInterceptor } from './common/auth/error.interceptor';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './core/login/login.component';
import { fakeBackendProvider } from './common/auth/fake.interceptor';
import { RegisterComponent } from './core/register/register.component';
import { AlertComponent } from './core/alert/alert.component';

@NgModule({
  imports: [ BrowserModule, AppsModule, AppLoadModule, ReactiveFormsModule,
    DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule, DxTabPanelModule, routing ],
  declarations: [ AppComponent, HeaderComponent, AdminHospitalComponent, AdminAgencyComponent, AdminAvilableUnitsComponent,
    AdminDispatchersComponent, AdminUnitsComponent, AddressTypeComponent, AgencyTypeComponent, ContactTypeComponent, OfficerRankComponent, UnitTypeComponent,
    TypesDisplayComponent, SplashScreenComponent, HomeComponent, AlertComponent, LoginComponent, RegisterComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [ AppComponent ],
  exports: [SplashScreenComponent]
})
export class AppModule { }
