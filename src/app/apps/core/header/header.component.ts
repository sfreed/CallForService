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

  adminFormEmitter: any;

  constructor(public dispatcherService: DispatcherService, private router: Router, private authService: AuthenticationService,
    private adminService: AdminService, private _hotkeysService: HotkeysService, private unitService: UnitService, private datePipe: DatePipe) {

      this.adminFormEmitter = adminService.adminFormEmitter;

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
          return '<img height="75px" style="vertical-align: center; padding-left: 5px;" src="../../../assets/CW-CFS-LOGO.png">';
      }
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'globe',
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
        icon: '../../../../assets/cogs.png',
        hint: 'Settings',
        text: 'Settings',
        onClick: () => {
          this.adminService.adminFormEmitter.emit(['typesPanelVisible', true]);
        }
      }
    }];
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
    this.itemsToActivate = [];
    this.itemsToDeactivate = [];
    this.activatePopupVisible = true;
  }

  activateUnits() {
    this.itemsToActivate.forEach(unit => {
      const unitToActivate: AvailableUnit = unit;
      unitToActivate.dateTimeIn = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToActivate.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToActivate.createdUserId = this.authService.getUser().id;
      unitToActivate.startMiles = 0;

      console.log('activating', unitToActivate);

      this.unitService.changeUnitStatus(unitToActivate);
    });

    this.activeUnitsList.instance.reload();
    this.inActiveUnitsList.instance.reload();
  }
  deactivateUnits() {
    this.itemsToDeactivate.forEach(unit => {
      const unitToDeactivate: AvailableUnit = unit;
      unitToDeactivate.dateTimeOut = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToDeactivate.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      unitToDeactivate.createdUserId = this.authService.getUser().id;
      unitToDeactivate.startMiles = 0;

      console.log('deactivating', unitToDeactivate);

      this.unitService.changeUnitStatus(unitToDeactivate);
    });

    this.activeUnitsList.instance.reload();
    this.inActiveUnitsList.instance.reload();
  }

  showMapScreen() {
    this.window.open('/map', '_blank ', 'menubar=no, resizable=no, scrollbars=no, statusbar=no, titlebar=no, toolbar=no, top=0, left=0, width=' + this.window.screen.width + ', height=' + this.window.screen.height);
  }

  closeActivatePopup() {
    this.adminFormEmitter.emit(['refreshActiveUnitList', true, null]);
    this.activatePopupVisible = false;
  }
}
