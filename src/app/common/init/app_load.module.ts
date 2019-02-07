import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppLoadService } from './app_load.service';

export function init_app(appLoadService: AppLoadService) {
    return () => appLoadService.initializeApp();
}

export function getCFSLookups(appLoadService: AppLoadService) {
  return () => appLoadService.getCFSLookups();
}

export function getPersonLookups(appLoadService: AppLoadService) {
  return () => appLoadService.getPersonLookups();
}

export function getVehicleLookups(appLoadService: AppLoadService) {
  return () => appLoadService.getVehicleLookups();
}

export function getLocationLookups(appLoadService: AppLoadService) {
  return () => appLoadService.getLocationLookups();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: getCFSLookups, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: getPersonLookups, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: getVehicleLookups, deps: [AppLoadService], multi: true },
    { provide: APP_INITIALIZER, useFactory: getLocationLookups, deps: [AppLoadService], multi: true }
  ]
})
export class AppLoadModule { }
