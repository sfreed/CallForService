import { Component, OnInit } from '@angular/core';
import { DispatcherService } from 'src/app/apps/services/dispatcher.service';
import { CallsService } from 'src/app/apps/services/calls.service';
import notify from 'devextreme/ui/notify';
import { OfficerService } from 'src/app/apps/services/officer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: any[];

  menuItems: any[];

  officerPanelVisible = false;

  dispatcherPanelVisible = false;

  constructor(public dispatcherService: DispatcherService, public callService: CallsService, public officerService: OfficerService) {

    this.items = [{
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
    }];
  }

  ngOnInit() {
    this.menuItems = [{
      id: '1',
      name: 'Video Players',
      items: [{
          id: '1_1',
          name: 'HD Video Player',
          price: 220
      }, {
          id: '1_2',
          name: 'SuperHD Video Player',
          price: 270
      }]
    }];
  }

  itemClick(e) {

  }

}
