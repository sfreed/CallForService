import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
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

    this.calls = new DataSource({
      store: new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return this.callService.getCallList();
        }
      }),
      sort: ['date', 'time'],
      paginate: true,
      pageSize: 25
    });
  }

  callSelected(e) {
    this.callService.setActiveCall(e.data);
    // e.component.editRow(e.rowIndex);
  }

  createAddress(data) {
    return data.address + ' ' + data.city + ', ' + data.state;
  }

  formSelected(e, callForm) {
    console.log('About to Start:', callForm.selectedItem);
  }

  tableInitialized() {
    this.callService.selectCall(this.calls[0]);
  }
}
