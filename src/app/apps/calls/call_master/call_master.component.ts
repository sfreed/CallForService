import { Component, OnInit } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-call-master',
  templateUrl: './call_master.component.html',
  styleUrls: ['./call_master.component.css']
})
export class CallMasterComponent implements OnInit {
  calls: DataSource;

  window: Window = window;

  callForms: any[];

  constructor(public callService: CallsService) {
  }

  ngOnInit() {
    this.callForms = this.callService.callForms;

    this.calls = new DataSource({
      store: new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return this.callService.calls;
        }
      }),
      sort: ['date', 'time'],
      paginate: true,
      pageSize: 25
    });
  }

  callSelected(e) {
    this.callService.setActiveCall(e.data);
  }

  createAddress(data) {
    return data.address + ' ' + data.city + ', ' + data.state;
  }

  formSelected(e, callForm) {
    console.log('About to Start:', callForm.selectedItem);
  }
}
