import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule,
  DxButtonModule, DxDrawerModule, DxScrollViewModule, DxContextMenuModule} from 'devextreme-angular';
import { ActiveListComponent} from './officers/active_list/active_list.component';
import { OfficerService } from './services/officer.service';
import { DispatcherHistoryComponent } from './dispatcher/dispatcherHistory/dispatcherHistory.component';
import { DispatcherHistory } from '../models/dispatcher_history';
import { CallMasterComponent } from './calls/call_master/call_master.component';
import { CallOfficersComponent } from './calls/call_officers/call_officers.component';
import { CallDetailsComponent } from './calls/call_details/call_details.component';
import { CallNotesComponent } from './calls/call_notes/call_notes.component';


@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, HttpModule,
    DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule, DxButtonModule,
    DxDrawerModule, DxScrollViewModule, DxContextMenuModule ],
  declarations: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, CallOfficersComponent,
                CallDetailsComponent, CallNotesComponent ],
  providers: [ OfficerService, DispatcherHistory ],
  bootstrap: [  ],
  exports: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, CallOfficersComponent ]
})
export class AppsModule { }
