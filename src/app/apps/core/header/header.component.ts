import { Component, OnInit } from '@angular/core';
import { DispatcherService } from 'src/app/common/services/master/Dispatcher.service';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { AdminService } from 'src/app/common/services/common/Admin.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

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

  window: Window = window;

  constructor(public dispatcherService: DispatcherService, private router: Router, private authenticationService: AuthenticationService,
    private adminService: AdminService, private _hotkeysService: HotkeysService) {

    this._hotkeysService.add(new Hotkey('ctrl+alt+r', (event: KeyboardEvent): boolean => {
      this.showReportsScreen();
      return false;
    }));

    this.menuItems = [{
      location: 'before',
      locateInMenu: 'never',
      template: () => {
          return '<img height="100px" src="../../../assets/CW-CFS-LOGO.png">';
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
          icon: 'fa fa-truck',
          hint: 'Service Setup',
          onClick: () => {
            notify('Services has been clicked!');
          }
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
        icon: 'fa fa-gear',
        hint: 'Settings',
        onClick: () => {
          this.adminService.adminFormEmitter.emit(['typesPanelVisible', true]);
        }
      }
    },  {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
        icon: 'folder',
        hint: 'Reports',
        onClick: this.showReportsScreen.bind(this)
      },
    }
    // {
    //    locateInMenu: 'always',
    //    text: 'Settings',
    //    onClick: () => {
    //        notify('Settings Clicked!');
    //    }
    // }, {
    //  locateInMenu: 'always',
    //  text: 'Preferences',
    //  onClick: () => {
    //      notify('Preferences Clicked!');
    //  }
    // }, {
    //  locateInMenu: 'always',
    //  text: 'Logout',
    //  onClick: () => {
    //      this.authenticationService.logout();
    //  }
    // }
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

  showReportsScreen() {
    this.window.open('http://google.com', '_blank ', 'menubar=no, resizable=no, scrollbars=no, statusbar=no, titlebar=no, toolbar=no, top=0, left=0, width=' + this.window.screen.width + ', height=' + this.window.screen.height);
  }
}
