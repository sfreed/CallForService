import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule,
  DxButtonModule, DxDrawerModule, DxScrollViewModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule, DxTabPanelModule, DxFormModule, DxAccordionModule, DxCalendarModule, DxDateBoxModule, DxTextBoxModule} from 'devextreme-angular';
import { ActiveListComponent} from './officers/active_list/active_list.component';
import { OfficerService } from '../services/officer.service';
import { DispatcherHistoryComponent } from './dispatcher/dispatcherHistory/dispatcherHistory.component';
import { DispatcherHistory } from '../models/history';
import { CallMasterComponent } from './calls/call_master/call_master.component';
import { OfficersComponent } from './calls/call_details/officers/officers.component';
import { CallDetailsComponent } from './calls/call_details/call_details.component';
import { CallNotesComponent } from './calls/call_notes/call_notes.component';
import { UserDataService } from '../services/UserData';
import { HospitalsComponent } from './calls/call_details/hospitals/hospitals.component';
import { VehiclesComponent } from './calls/call_details/vehicles/vehicles.component';
import { ComplainantsComponent } from './calls/call_details/complainants/complainants.component';
import { InvolvedPersonsComponent } from './calls/call_details/involved_persons/involved_persons.component';
import { WreckersComponent } from './calls/call_details/wreckers/wreckers.component';
import { CallHistoryComponent } from './calls/call_details/call_history/call_history.component';
import { DetailsComponent } from './calls/call_details/details/details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListDataService } from '../services/ListData';

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, DragDropModule,
    DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule, DxButtonModule,
    DxDrawerModule, DxTabPanelModule, DxContextMenuModule, DxTextAreaModule, DxPopupModule, DxFormModule, DxAccordionModule,
    DxDateBoxModule, DxTextBoxModule ],
  declarations: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent,
    CallDetailsComponent, CallNotesComponent, CallHistoryComponent, DetailsComponent,
    OfficersComponent, HospitalsComponent, VehiclesComponent, ComplainantsComponent, InvolvedPersonsComponent, WreckersComponent ],
  providers: [ OfficerService, DispatcherHistory, UserDataService, ListDataService ],
  bootstrap: [  ],
  exports: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, OfficersComponent,
    CallDetailsComponent, CallNotesComponent, CallHistoryComponent, DetailsComponent ]
})
export class AppsModule { }
