import { Component, OnInit } from '@angular/core';
import { DispatcherHistoryService } from 'src/app/apps/services/dispatcher.service';
import { CallsService } from 'src/app/apps/services/calls.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: any[];

  menuItems: any[];

  constructor(dispatcherService: DispatcherHistoryService, public callService: CallsService) {

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
          icon: 'toolbox',
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
          notify('Add Officers has been clicked!');
      }
    }, {
      locateInMenu: 'always',
      text: 'Add Dispatcher',
      onClick: () => {
          notify('Add Dispatcher has been clicked!');
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
