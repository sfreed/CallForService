import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.module';
import { DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule } from 'devextreme-angular';
import { HeaderComponent } from './core/header/header.component';
import { AdminHospitalComponent } from './core/adminHospital/AdminHospital.component';

@NgModule({
  imports: [ BrowserModule, AppsModule,
    DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule, DxMenuModule, DxPopupModule, DxDataGridModule ],
  declarations: [ AppComponent, HeaderComponent, AdminHospitalComponent ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
