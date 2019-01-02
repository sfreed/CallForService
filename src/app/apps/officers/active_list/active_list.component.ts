import { Component, ViewChild, OnInit } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DispatcherHistoryService } from '../../services/dispatcher.service';
import { CallsService } from '../../services/calls.service';
import { OfficerService } from '../../services/officer.service';
import DataSource from 'devextreme/data/data_source';
import Switch from 'devextreme/ui/switch';
import notify from 'devextreme/ui/notify';
import uuid from 'UUID';

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
      id: 0,
      text: 'Clock in',
      disabled: false
    }, {
      id: 1,
      text: 'Clock Out',
      disabled: false
    }, {
      id: 2,
      text: 'Dispatch To Current Call',
      disabled: false
    }, {
      id: 3,
      text: 'Update Dispatch',
      disabled: false
    }];
  }

  ngOnInit() {
    this.activeOfficers = this.officerService.getOfficerList();
  }

  contextItemClick(e, officer) {
    if (e.itemData.id === 0) {
      if (officer.active) {
        notify(officer.first_name + ' ' + officer.last_name  + ' is already clocked in.', 'warning');
      } else {
        this.officerService.changeDutyStatus(officer);
      }
    } else if (e.itemData.id === 1) {
      if (!officer.active) {
        notify(officer.first_name + ' ' + officer.last_name  + ' is already clocked out.', 'warning');
      } else {
        this.officerService.changeDutyStatus(officer);
      }
    } else {
      if (this.callService.getActiveCall() == null) {
        notify('Please Select a Call in which to assign  ' + officer.first_name + ' ' + officer.last_name  + '.', 'waring');
        return;
      }

      if (!officer.active) {
        this.officerService.changeDutyStatus(officer);
      }

      if (this.callService.assignOfficerToActiveCall(officer, this.callService.getActiveCall())) {
        notify('Assigning Officer ' + officer.first_name + ' ' + officer.last_name  + ' to Active Call.', 'success');
      } else {
        notify('Officer ' + officer.first_name + ' ' + officer.last_name  + ' is already assigned to this Call.', 'warning');
      }

      this.dispatcherHistory.addHistoryItem({
        id: uuid(),
        action: 'Assigning to Call ' + this.callService.getActiveCall().id,
        first_name: officer.first_name,
        last_name: officer.last_name,
        badge_number: officer.badge_number,
        time: new Date()
      });
    }
  }

  selectOfficer(e) {
    if (e.itemData.call_status === 'INACTIVE') {
      notify('Officer ' + e.itemData.first_name + ' ' + e.itemData.last_name  + ' not assigned to an Active Call.');
    }

    this.callService.selectCall(e.itemData.current_call);
  }
}
