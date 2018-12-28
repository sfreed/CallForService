import { Component, ViewChild, OnInit } from '@angular/core';
import { OfficerService } from '../../services/officer.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DxListComponent, DxSwitchComponent } from 'devextreme-angular';
import Switch from 'devextreme/ui/switch';
import notify from 'devextreme/ui/notify';

import { _ } from 'underscore';
import { DispatcherHistoryService } from '../../services/dispatcher.service';
import { CallsService } from '../../services/calls.service';
import { Officer } from 'src/app/models/officer';

@Component({
  selector: 'app-active-list',
  templateUrl: './active_list.component.html',
  styleUrls: ['./active_list.component.css'],
})
export class ActiveListComponent implements OnInit {
  @ViewChild(DxListComponent) list: DxListComponent;

  public window: Window = window;

  activeOfficers: DataSource;

  menuItems: any;

  constructor(public officerService: OfficerService, public dispatcherHistory: DispatcherHistoryService, public callService: CallsService) {
    this.menuItems = [{
      text: 'Assign To Current Call',
      action: function (e) {
        const officer: Officer = e.itemData;

        if (this.callService.activeCall == null) {
          notify('Please Select a Call in which to assign  ' + officer.first_name + ' ' + officer.last_name  + '.');
          return;
        }

        if (!officer.active) {
          this.onActiveChange(officer);

          // needed to manually adjust list item css
          const elementclass = e.itemElement.childNodes[0].childNodes[0].childNodes[1].id;
          const instance = Switch.getInstance(document.getElementById(elementclass)) as Switch;
          instance.option('value', true);
          document.getElementById('switchdiv' + officer.id).className = 'officerName badge' + officer.id + ' activetrue';
        }

        callService.assignOfficerToActiveCall(officer);

        notify('Assigning Officer ' + officer.first_name + ' ' + officer.last_name  + ' to Active Call.');

        this.dispatcherHistory.addHistory({id: '0',
          action: 'Assigning to Call ' + callService.activeCall.id,
          first_name: officer.first_name,
          last_name: officer.last_name,
          badge_number: officer.badge_number,
          time: new Date()});

      }.bind(this)
    }];
  }

  ngOnInit() {
    this.activeOfficers = new DataSource({
      store: new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return this.officerService.officers;
        }
      }),
      sort: ['duty_status', 'last_name'],
      paginate: true,
      pageSize: 25
    });
  }

  onActiveChange(officer) {
    this.officerService.changeDutyStatus(officer);
  }

  itemClick(e, officer) {
    console.log('EVENT: ', e);
    console.log('Clicked: ', officer);
    this.officerService.changeDutyStatus(officer);
  }
}
