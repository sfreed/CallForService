import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule,
  DxButtonModule, DxDrawerModule, DxScrollViewModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule, DxTabPanelModule, DxFormModule, DxAccordionModule} from 'devextreme-angular';
import { ActiveListComponent} from './officers/active_list/active_list.component';
import { OfficerService } from './services/officer.service';
import { DispatcherHistoryComponent } from './dispatcher/dispatcherHistory/dispatcherHistory.component';
import { DispatcherHistory } from '../models/history';
import { CallMasterComponent } from './calls/call_master/call_master.component';
import { OfficersComponent } from './calls/call_details/officers/officers.component';
import { CallDetailsComponent } from './calls/call_details/call_details.component';
import { CallNotesComponent } from './calls/call_notes/call_notes.component';
import { DataService } from './services/data';
import { HospitalsComponent } from './calls/call_details/hospitals/hospitals.component';
import { VehiclesComponent } from './calls/call_details/vehicles/vehicles.component';
import { ComplaintantsComponent } from './calls/call_details/complaintants/complaintants.component';
import { InvolvedPersonsComponent } from './calls/call_details/involved_persons/involved_persons.component';
import { WreckersComponent } from './calls/call_details/wreckers/wreckers.component';
import { CallHistoryComponent } from './calls/call_details/call_history/call_history.component';
import { DetailsComponent } from './calls/call_details/details/details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, HttpModule, DragDropModule,
    DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule, DxButtonModule,
    DxDrawerModule, DxTabPanelModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule, DxFormModule, DxAccordionModule ],
  declarations: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent,
    CallDetailsComponent, CallNotesComponent, CallHistoryComponent, DetailsComponent,
    OfficersComponent, HospitalsComponent, VehiclesComponent, ComplaintantsComponent, InvolvedPersonsComponent, WreckersComponent ],
  providers: [ OfficerService, DispatcherHistory, DataService ],
  bootstrap: [  ],
  exports: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, OfficersComponent,
    CallDetailsComponent, CallNotesComponent, CallHistoryComponent, DetailsComponent ]
})
export class AppsModule { }
