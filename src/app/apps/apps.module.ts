import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule,
  DxButtonModule, DxDrawerModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule,
  DxTabPanelModule, DxFormModule, DxAccordionModule, DxDateBoxModule, DxTextBoxModule, DxAutocompleteModule,
  DxLoadPanelModule,
  DxMapModule} from 'devextreme-angular';
import { ActiveListComponent} from './units/active_list/active_list.component';
import { UnitService } from '../common/services/units/Unit.service';
import { DispatcherHistoryComponent } from './dispatcher/dispatcherHistory/dispatcherHistory.component';
import { DispatcherHistory } from '../common/models/common/history';
import { CallMasterComponent } from './calls/call_master/call_master.component';
import { CallDetailsComponent } from './calls/call_details/call_details.component';
import { VehiclesComponent } from './calls/call_details/involved_vehicles/involved_vehicles.component';
import { ComplainantsComponent } from './calls/call_details/complainants/complainants.component';
import { InvolvedPersonsComponent } from './calls/call_details/involved_persons/involved_persons.component';
import { DetailsComponent } from './calls/call_details/details/details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InvolvedUnitsComponent } from './calls/call_details/involved_units/involved_units.component';
import { UnitQueueComponent } from './units/unit_queue/unit_queue.component';
import { LocationsComponent } from './calls/call_details/locations/locations.component';
import { CallRemarksComponent } from './calls/call_remarks/call_remarks.component';
import {HotkeyModule} from 'angular2-hotkeys';
import { UnitMapComponent } from './core/unitMap/unitMap.component';
import { ActivityLogComponent } from './calls/call_details/activity_log/activity_log.component';

@NgModule({
  imports: [ BrowserModule, DragDropModule,
    DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule, DxButtonModule,
    DxDrawerModule, DxTabPanelModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule, DxFormModule, DxAccordionModule,
    DxDateBoxModule, DxTextBoxModule, DxAutocompleteModule, DxLoadPanelModule, HotkeyModule.forRoot(), DxMapModule ],
  declarations: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, UnitQueueComponent,
    CallDetailsComponent, CallRemarksComponent, DetailsComponent, LocationsComponent, ActivityLogComponent,
    InvolvedUnitsComponent, VehiclesComponent, ComplainantsComponent, InvolvedPersonsComponent, UnitMapComponent ],
  providers: [ UnitService, DispatcherHistory ],
  bootstrap: [  ],
  exports: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, InvolvedUnitsComponent,
    CallDetailsComponent, CallRemarksComponent, DetailsComponent, LocationsComponent, UnitMapComponent ]
})
export class AppsModule { }
