import { Component, OnInit } from '@angular/core';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: any[];

  unitPanelVisible = false;

  dispatcherPanelVisible = false;

  agencyPanelVisible = false;

  hospitalPanelVisible = false;

  availableUnitsPanelVisible = false;

  constructor(public dispatcherService: DispatcherService,
    private router: Router,
    private authenticationService: AuthenticationService) {
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
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
        icon: 'fa fa-pencil',
        onClick: () => {
          dispatcherService.toggleDispatcherHistory();
        }
      }
    }, {
        locateInMenu: 'always',
        text: 'Settings',
        onClick: () => {
            notify('Settings Clicked!');
        }
    }, {
      locateInMenu: 'always',
      text: 'Preferences',
      onClick: () => {
          notify('Preferences Clicked!');
      }
    }, {
      locateInMenu: 'always',
      text: 'Logout',
      onClick: () => {
          this.authenticationService.logout();
      }
    }
    // }, {
    //   locateInMenu: 'always',
    //   text: 'Add Officers',
    //   onClick: () => {
    //       this.adminService.adminFormEmitter.emit(['officerPanelVisible', true]);
    //   }
    // }, {
    //   locateInMenu: 'always',
    //   text: 'Add Dispatcher',
    //   onClick: () => {
    //     this.adminService.adminFormEmitter.emit(['dispatcherPanelVisible', true]);
    //   }
    // }, {
    //   locateInMenu: 'always',
    //   text: 'Add Agency',
    //   onClick: () => {
    //     this.adminService.adminFormEmitter.emit(['agencyPanelVisible', true]);
    //   }
    // }, {
    //   locateInMenu: 'always',
    //   text: 'Add Hospital',
    //   onClick: () => {
    //     this.adminService.adminFormEmitter.emit(['hospitalPanelVisible', true]);
    //   }
    // }, {
    //   locateInMenu: 'always',
    //   text: 'Add Unit',
    //   onClick: () => {
    //     this.adminService.adminFormEmitter.emit(['availableUnitsPanelVisible', true]);
    //   }
    // }, {
    //   locateInMenu: 'always',
    //   text: 'Add Types',
    //   onClick: () => {
    //     this.adminService.adminFormEmitter.emit(['typesPanelVisible', true]);
    //   }
    // }
    ];
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}