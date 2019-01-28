import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.module';
import { DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule } from 'devextreme-angular';
import { HeaderComponent } from './core/header/header.component';
import { AdminHospitalComponent } from './core/adminHospital/AdminHospital.component';
import { AdminAgencyComponent } from './core/adminAgency/adminAgency.component';
import { AdminAvilableUnitsComponent } from './core/adminAvilableUnits/adminAvilableUnits.component';
import { AdminDispatchersComponent } from './core/adminDispatchers/adminDispatchers.component';
import { AdminOfficersComponent } from './core/adminOfficers/adminOfficers.component';

@NgModule({
  imports: [ BrowserModule, AppsModule,
    DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule ],
  declarations: [ AppComponent, HeaderComponent, AdminHospitalComponent, AdminAgencyComponent, AdminAvilableUnitsComponent,
    AdminDispatchersComponent, AdminOfficersComponent ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
