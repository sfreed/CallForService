import { Component, ViewChild, OnInit } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import { DispatcherHistoryService } from '../../services/dispatcher.service';
import { CallsService } from '../../services/calls.service';
import { OfficerService } from '../../services/officer.service';
import DataSource from 'devextreme/data/data_source';
import Switch from 'devextreme/ui/switch';
import notify from 'devextreme/ui/notify';

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
      text: 'Dispatch To Current Call',
      disabled: false
    }, {
      text: 'Update Dispatch',
      disabled: false
    }];
  }

  ngOnInit() {
    this.activeOfficers = this.officerService.getOfficerList();
  }

  onActiveChange(officer) {
    this.officerService.changeDutyStatus(officer);
  }

  contextItemClick(e, officer) {
    if (this.callService.getActiveCall() == null) {
      notify('Please Select a Call in which to assign  ' + officer.first_name + ' ' + officer.last_name  + '.');
      return;
     }

     if (!officer.active) {
      // needed to manually adjust list item css
      const instance = Switch.getInstance(document.getElementById('switch' + officer.id)) as Switch;
      instance.option('value', true);
      document.getElementById('switchdiv' + officer.id).className = 'officerName badge' + officer.id + ' activetrue';
     }

     if (this.callService.assignOfficerToActiveCall(officer, this.callService.getActiveCall())) {
      notify('Assigning Officer ' + officer.first_name + ' ' + officer.last_name  + ' to Active Call.');
     } else {
      notify('Officer ' + officer.first_name + ' ' + officer.last_name  + ' is already assigned to this Call.');
     }

    this.dispatcherHistory.addHistoryItem({
      id: 0,
      action: 'Assigning to Call ' + this.callService.getActiveCall().id,
      first_name: officer.first_name,
      last_name: officer.last_name,
      badge_number: officer.badge_number,
      time: new Date()
    });
  }

  selectOfficer(e) {
    if (e.itemData.call_status === 'INACTIVE') {
      notify('Officer ' + e.itemData.first_name + ' ' + e.itemData.last_name  + ' not assigned to an Active Call.');
    }

    this.callService.selectCall(e.itemData.current_call);
  }
}
