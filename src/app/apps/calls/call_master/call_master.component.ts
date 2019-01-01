import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-call-master',
  templateUrl: './call_master.component.html',
  styleUrls: ['./call_master.component.css']
})
export class CallMasterComponent implements OnInit {
  @ViewChild(DxDataGridComponent) callGrid;

  calls: DataSource;

  isRowSelected = false;

  window: Window = window;

  callForms: any[];

  constructor(public callService: CallsService) {}

  ngOnInit() {
    this.callService.setCallGrid(this.callGrid);

    this.callForms = this.callService.getCallForms();

    this.calls = this.callService.getCallList();
  }

  createAddress(data) {
    return data.address + ' ' + data.city + ', ' + data.state;
  }

  formSelected(e, callForm) {
    console.log('About to Start:', callForm.selectedItem);
  }

  selectionChanged(e) {
    this.callService.setActiveCall(e.selectedRowsData[0]);
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);

  }
}
