import { Component, OnInit, Output } from '@angular/core';
import { DispatcherService } from 'src/app/apps/services/dispatcher.service';
import { CallsService } from 'src/app/apps/services/calls.service';
import notify from 'devextreme/ui/notify';
import { OfficerService } from 'src/app/apps/services/officer.service';
import { AgencyService } from 'src/app/apps/services/agency.service';
import { ListsService } from 'src/app/apps/services/lists.service';
import { AvailableUnitService } from 'src/app/apps/services/availableUnit.service.';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: any[];

  officerPanelVisible = false;

  dispatcherPanelVisible = false;

  agencyPanelVisible = false;

  @Output()
  hospitalPanelVisible = false;

  availableUnitsPanelVisible = false;

  constructor(public dispatcherService: DispatcherService, public callService: CallsService, public officerService: OfficerService, public agencyService: AgencyService,
    public listDataService: ListsService, public availableUnitService: AvailableUnitService) {

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
          this.officerPanelVisible = true;
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Dispatcher',
      onClick: () => {
          this.dispatcherPanelVisible = true;
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Agency',
      onClick: () => {
          this.agencyPanelVisible = true;
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Hospital',
      onClick: () => {
          this.hospitalPanelVisible = true;
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Unit',
      onClick: () => {
          this.availableUnitsPanelVisible = true;
      }
    }];
  }

  ngOnInit() {
  }
}
