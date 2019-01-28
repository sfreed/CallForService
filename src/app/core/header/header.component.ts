import { Component, OnInit, EventEmitter } from '@angular/core';
import { DispatcherService } from 'src/app/services/dispatcher.service';
import notify from 'devextreme/ui/notify';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  adminFormEmitter = new EventEmitter<[string, boolean]>();

  menuItems: any[];

  officerPanelVisible = false;

  dispatcherPanelVisible = false;

  agencyPanelVisible = false;

  hospitalPanelVisible = false;

  availableUnitsPanelVisible = false;

  constructor(public dispatcherService: DispatcherService, public adminService: AdminService) {

    this.menuItems = [{
      location: 'before',
      locateInMenu: 'never',
      template: () => {
          return '<div>Courtware Call For Service</div>';
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
          icon: 'fa fa-truck',
          onClick: () => {
              notify('Add button has been clicked!');
          }
      }
    }, {
      locateInMenu: 'always',
      text: 'History',
      onClick: () => {
        dispatcherService.toggleDispatcherHistory();
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Officers',
      onClick: () => {
          this.adminService.adminFormEmitter.emit(['officerPanelVisible', true]);
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Dispatcher',
      onClick: () => {
        this.adminService.adminFormEmitter.emit(['dispatcherPanelVisible', true]);
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Agency',
      onClick: () => {
        this.adminService.adminFormEmitter.emit(['agencyPanelVisible', true]);
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Hospital',
      onClick: () => {
        this.adminService.adminFormEmitter.emit(['hospitalPanelVisible', true]);
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Unit',
      onClick: () => {
        this.adminService.adminFormEmitter.emit(['availableUnitsPanelVisible', true]);
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Types',
      onClick: () => {
        this.adminService.adminFormEmitter.emit(['typesPanelVisible', true]);
      }
    }];
  }

  ngOnInit() {
  }
}
