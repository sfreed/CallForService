import { Component, OnInit, ViewChild } from '@angular/core';
import { RemarksService } from 'src/app/common/services/callDetails/Remarks.service';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { MasterUserService } from 'src/app/common/services/master/MasterUser.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-call-notes',
  templateUrl: './call_remarks.component.html',
  styleUrls: ['./call_remarks.component.css']
})
export class CallRemarksComponent implements OnInit {
  @ViewChild('callRemarksGrid') clientGrid: DxDataGridComponent;

  callRemarksListDS: DataSource;

  currentNote: string;

  dispatchers: DataSource;

  constructor(public remarksService: RemarksService, public callService: CallsService, private masterUserService: MasterUserService,  private _hotkeysService: HotkeysService) {
    this.callService.callEmitter.subscribe((data: CallForService) => {
      this.callRemarksListDS = this.remarksService.getCallRemarksDS();
    });

    this._hotkeysService.add(new Hotkey('alt+s', (event: KeyboardEvent): boolean => {

      console.log('saving note:', this.currentNote);
      this.saveNote();
      return false; // Prevent bubbling
    }));

    this.dispatchers = this.masterUserService.getMasterUserList();
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
