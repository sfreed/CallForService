import { NgModule, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppsModule } from './apps/apps.module';
import { DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule } from 'devextreme-angular';
import { HeaderComponent } from './core/header/header.component';

@NgModule({
  imports: [ BrowserModule, AppsModule,
    DxBoxModule, DxButtonModule, DxDrawerModule, DxListModule, DxToolbarModule],
  declarations: [ AppComponent, HeaderComponent ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

// enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
