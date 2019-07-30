import { Component, OnInit, ViewChild } from '@angular/core';
import { DispatcherService } from 'src/app/common/services/master/Dispatcher.service';
import notify from 'devextreme/ui/notify';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { AdminService } from 'src/app/common/services/common/Admin.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import DataSource from 'devextreme/data/data_source';
import { UnitService } from 'src/app/common/services/units/Unit.service';
import { DxListComponent } from 'devextreme-angular';
import { AvailableUnit } from 'src/app/common/models/units/AvailableUnit';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('inActiveUnitsList') inActiveUnitsList: DxListComponent;

  @ViewChild('activeUnitsList') activeUnitsList: DxListComponent;

  menuItems: any[];

  unitPanelVisible = false;

  activatePopupVisible = false;

  dispatcherPanelVisible = false;

  agencyPanelVisible = false;

  hospitalPanelVisible = false;

  availableUnitsPanelVisible = false;

  window: Window = window;

  activeUnits: DataSource;

  inactiveUnits: DataSource;

  itemsToActivate: [] = [];

  itemsToDeactivate: [] = [];

  constructor(public dispatcherService: DispatcherService, private router: Router, private authService: AuthenticationService,
    private adminService: AdminService, private _hotkeysService: HotkeysService, private unitService: UnitService, private datePipe: DatePipe) {

    this.activeUnits = this.unitService.getActiveUnitsList();
    this.inactiveUnits = this.unitService.getInactiveUnitsList();

    this._hotkeysService.add(new Hotkey('ctrl+alt+r', (event: KeyboardEvent): boolean => {
      this.showReportsScreen();
      return false;
    }));

    this.menuItems = [{
      location: 'before',
      locateInMenu: 'never',
      template: () => {
          return '<img height="75px" style="vertical-align: center;" src="../../../assets/CW-CFS-LOGO.png">';
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
          icon: '../../../../assets/truck.png',
          hint: 'Wrecker Rotation Setup',
          text: 'Wrecker',
          onClick: () => {
            notify('Wrecker Rotation Service has been clicked!');
          }
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: '../../../../assets/map.png',
        hint: 'Patrol',
        text: 'Patrol',
        onClick: this.showMapScreen.bind(this)
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
          icon: '../../../../assets/activate-unit.png',
          hint: 'Activate / Deactivate Units',
          text: 'Units',
          onClick: () => {
            this.showActivatePopup();
          }
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
        icon: '../../../../assets/reports.png',
        hint: 'Reports',
        text: 'Reports',
        onClick: this.showReportsScreen.bind(this)
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      locateInMenu: 'never',
      options: {
        icon: '../../../../assets/settings-icon.png',
        hint: 'Settings',
        text: 'Settings',
        onClick: () => {
          this.adminService.adminFormEmitter.emit(['typesPanelVisible', true]);
        }
      }
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
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showReportsScreen() {
    this.window.open('http://google.com', '_blank ', 'menubar=no, resizable=no, scrollbars=no, statusbar=no, titlebar=no, toolbar=no, top=0, left=0, width=' + this.window.screen.width + ', height=' + this.window.screen.height);
  }

  showActivatePopup() {
    console.log('showing:');
    this.activatePopupVisible = true;
  }

  activateUnits() {
    this.itemsToActivate.forEach(unit => {
      const unitToActivate: AvailableUnit = unit;
      unitToActivate.dateTimeIn = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToActivate.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToActivate.createdUserId = this.authService.getUser().id;
      unitToActivate.status = 2;
      unitToActivate.startMiles = 0;

      console.log('activating', unitToActivate);

      this.unitService.changeUnitStatus(unitToActivate);
    });
  }
  deactivateUnits() {
    this.itemsToDeactivate.forEach(unit => {
      const unitToDeactivate: AvailableUnit = unit;
      unitToDeactivate.dateTimeIn = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToDeactivate.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToDeactivate.createdUserId = this.authService.getUser().id;
      unitToDeactivate.status = 1;
      unitToDeactivate.startMiles = 0;

      console.log('deactivating', unitToDeactivate);

      this.unitService.changeUnitStatus(unitToDeactivate);
    });
  }

  showMapScreen() {
    this.window.open('/map', '_blank ', 'menubar=no, resizable=no, scrollbars=no, statusbar=no, titlebar=no, toolbar=no, top=0, left=0, width=' + this.window.screen.width + ', height=' + this.window.screen.height);
  }
}
