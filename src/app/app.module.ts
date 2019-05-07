import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule, DxTabPanelModule } from 'devextreme-angular';
import { HeaderComponent } from './apps/core/header/header.component';
import { AddressTypeComponent } from './apps/core/types/addressType/addressType.component';
import { AgencyTypeComponent } from './apps/core/types/agencyType/agencyType.component';
import { ContactTypeComponent } from './apps/core/types/contactType/contactType.component';
import { OfficerRankComponent } from './apps/core/types/officerRank/officerRank.component';
import { TypesDisplayComponent } from './apps/core/types/typesDisplay.component';
import { UnitTypeComponent } from './apps/core/types/unitType/unitType.component';
import { SplashScreenComponent } from './apps/core/splash-screen/splash-screen.component';
import { HomeComponent } from './apps/core/home/home.component';
import { routing } from './app.routing';

import { JwtInterceptor } from './common/auth/jwt.interceptor';
import { ErrorInterceptor } from './common/auth/error.interceptor';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './apps/core/login/login.component';
import { AlertComponent } from './apps/core/alert/alert.component';
import { AuthenticationService } from './common/auth/auth.service';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './common/auth/auth.guard';

@NgModule({
  imports: [ BrowserModule, HttpClientModule, AppsModule, ReactiveFormsModule, HttpModule,
    DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule, DxTabPanelModule, routing ],
  declarations: [ AppComponent, HeaderComponent, AddressTypeComponent, AgencyTypeComponent, ContactTypeComponent, OfficerRankComponent, UnitTypeComponent,
    TypesDisplayComponent, SplashScreenComponent, HomeComponent, AlertComponent, LoginComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService, AuthGuard
  ],
  bootstrap: [ AppComponent ],
  exports: [SplashScreenComponent]
})
export class AppModule { }
