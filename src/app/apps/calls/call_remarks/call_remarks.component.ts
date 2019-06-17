import { Component, OnInit, ViewChild } from '@angular/core';
import { RemarksService } from 'src/app/common/services/callDetails/Remarks.service';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { MasterUserService } from 'src/app/common/services/master/MasterUser.service';

@Component({
  selector: 'app-call-notes',
  templateUrl: './call_remarks.component.html',
  styleUrls: ['./call_remarks.component.css']
})
export class CallRemarksComponent implements OnInit {
  @ViewChild('callRemarksGrid') clientGrid: DxDataGridComponent;

  callNotesToolbarItems: any;

  callRemarksListDS: DataSource;

  currentNote: string;

  dispatchers: DataSource;

  constructor(public remarksService: RemarksService, public callService: CallsService, private masterUserService: MasterUserService) {
    this.callService.callEmitter.subscribe((data: CallForService) => {
      this.callRemarksListDS = this.remarksService.getCallRemarksDS();
    });

    this.dispatchers = this.masterUserService.getMasterUserList();

    this.callNotesToolbarItems = [{
      location: 'center',
      locateInMenu: 'never',
      template: () => {
          return '<div style="font-size: large;">Call Remarks</div>';
      }
    }];
  }

  ngOnInit() {

  }

  saveNote() {
    this.remarksService.saveCallRemark(this.currentNote).then(res => {
      this.clientGrid.instance.refresh();
    });
    this.currentNote = '';
  }
}
