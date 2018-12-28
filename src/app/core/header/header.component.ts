import { Component, OnInit } from '@angular/core';
import { DispatcherHistoryService } from 'src/app/apps/services/dispatcher.service';
import { CallsService } from 'src/app/apps/services/calls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: any[];

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
      locateInMenu: 'auto',
      options: {
          icon: 'menu',
          onClick: () => {
           dispatcherService.toggleDispatcherHistory();
        }
      }
    }];
  }

  ngOnInit() {
  }

}
