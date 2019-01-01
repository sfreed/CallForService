import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule,
  DxButtonModule, DxDrawerModule, DxScrollViewModule, DxContextMenuModule, DxTextAreaModule} from 'devextreme-angular';
import { ActiveListComponent} from './officers/active_list/active_list.component';
import { OfficerService } from './services/officer.service';
import { DispatcherHistoryComponent } from './dispatcher/dispatcherHistory/dispatcherHistory.component';
import { DispatcherHistory } from '../models/history';
import { CallMasterComponent } from './calls/call_master/call_master.component';
import { CallOfficersComponent } from './calls/call_officers/call_officers.component';
import { CallDetailsComponent } from './calls/call_details/call_details.component';
import { CallNotesComponent } from './calls/call_notes/call_notes.component';
import { DataService } from './services/data';


@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, HttpModule,
    DxBoxModule, DxListModule, DxDataGridModule, DxSwitchModule, DxToolbarModule, DxSelectBoxModule, DxButtonModule,
    DxDrawerModule, DxScrollViewModule, DxContextMenuModule, DxTextAreaModule ],
  declarations: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, CallOfficersComponent,
                CallDetailsComponent, CallNotesComponent ],
  providers: [ OfficerService, DispatcherHistory, DataService ],
  bootstrap: [  ],
  exports: [ActiveListComponent, DispatcherHistoryComponent, CallMasterComponent, CallOfficersComponent,
    CallDetailsComponent, CallNotesComponent ]
})
export class AppsModule { }
