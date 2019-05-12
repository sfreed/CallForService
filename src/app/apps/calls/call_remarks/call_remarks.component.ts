import { Component, OnInit, ViewChild } from '@angular/core';
import { RemarksService } from 'src/app/common/services/remarks.service';
import { CallsService } from 'src/app/common/services/calls.service';
import DataSource from 'devextreme/data/data_source';
import { CallForServiceDetails } from 'src/app/common/models/callDetails/CallForServiceDetail';
import { DxDataGridComponent } from 'devextreme-angular';

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

  constructor(public remarksService: RemarksService, public callService: CallsService) {
    this.callService.callDetailsEmitter.subscribe(
      (data: CallForServiceDetails) => {

        this.callRemarksListDS = this.remarksService.getCallRemarksDS();
      });

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
