import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.module';
import { DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule, DxTabPanelModule } from 'devextreme-angular';
import { HeaderComponent } from './core/header/header.component';
import { AdminHospitalComponent } from './core/sources/adminHospital/adminHospital.component';
import { AdminAgencyComponent } from './core/sources/adminAgency/adminAgency.component';
import { AdminAvilableUnitsComponent } from './core/sources/adminAvilableUnits/adminAvilableUnits.component';
import { AdminDispatchersComponent } from './core/sources/adminDispatchers/adminDispatchers.component';
import { AdminOfficersComponent } from './core/sources/adminOfficers/adminOfficers.component';
import { AddressTypeComponent } from './core/types/addressType/addressType.component';
import { AgencyTypeComponent } from './core/types/agencyType/agencyType.component';
import { ContactTypeComponent } from './core/types/contactType/contactType.component';
import { OfficerRankComponent } from './core/types/officerRank/officerRank.component';
import { TypesDisplayComponent } from './core/types/typesDisplay.component';
import { UnitTypeComponent } from './core/types/unitType/unitType.component';
import { AppLoadModule } from './common/init/app_load.module';
import { SplashScreenComponent } from './core/splash-screen/splash-screen.component';


@NgModule({
  imports: [ BrowserModule, AppsModule, AppLoadModule,
    DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule, DxTabPanelModule ],
  declarations: [ AppComponent, HeaderComponent, AdminHospitalComponent, AdminAgencyComponent, AdminAvilableUnitsComponent,
    AdminDispatchersComponent, AdminOfficersComponent, AddressTypeComponent, AgencyTypeComponent, ContactTypeComponent, OfficerRankComponent, UnitTypeComponent,
    TypesDisplayComponent, SplashScreenComponent],
  providers: [ ],
  bootstrap: [ AppComponent ],
  exports:[SplashScreenComponent]
})
export class AppModule { }
