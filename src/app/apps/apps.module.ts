import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule,
  DxButtonModule, DxDrawerModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule,
  DxTabPanelModule, DxFormModule, DxAccordionModule, DxDateBoxModule, DxTextBoxModule, DxLookupModule, DxAutocompleteModule} from 'devextreme-angular';
import { ActiveListComponent} from './units/active_list/active_list.component';
import { UnitService } from '../common/services/unit.service';
import { DispatcherHistoryComponent } from './dispatcher/dispatcherHistory/dispatcherHistory.component';
import { DispatcherHistory } from '../common/models/common/history';
import { CallMasterComponent } from './calls/call_master/call_master.component';
import { CallDetailsComponent } from './calls/call_details/call_details.component';
import { VehiclesComponent } from './calls/call_details/involved_vehicles/involved_vehicles.component';
import { ComplainantsComponent } from './calls/call_details/complainants/complainants.component';
import { InvolvedPersonsComponent } from './calls/call_details/involved_persons/involved_persons.component';
import { CallHistoryComponent } from './calls/call_details/call_history/call_history.component';
import { DetailsComponent } from './calls/call_details/details/details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InvolvedUnitsComponent } from './calls/call_details/involved_units/involved_units.component';
import { UnitQueueComponent } from './units/unit_queue/unit_queue.component';
import { LocationsComponent } from './calls/call_details/locations/locations.component';
import { CallRemarksComponent } from './calls/call_remarks/call_remarks.component';

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, DragDropModule,
    DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule, DxButtonModule,
    DxDrawerModule, DxTabPanelModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule, DxFormModule, DxAccordionModule,
    DxDateBoxModule, DxTextBoxModule, DxLookupModule, DxAutocompleteModule ],
  declarations: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, UnitQueueComponent,
    CallDetailsComponent, CallRemarksComponent, CallHistoryComponent, DetailsComponent, LocationsComponent,
    InvolvedUnitsComponent, VehiclesComponent, ComplainantsComponent, InvolvedPersonsComponent ],
  providers: [ UnitService, DispatcherHistory ],
  bootstrap: [  ],
  exports: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, InvolvedUnitsComponent,
    CallDetailsComponent, CallRemarksComponent, CallHistoryComponent, DetailsComponent, LocationsComponent ]
})
export class AppsModule { }
