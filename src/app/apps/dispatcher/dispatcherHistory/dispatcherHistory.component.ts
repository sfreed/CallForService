import { Component, OnInit, ViewChild } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { _ } from 'underscore';
import { DispatcherHistoryService } from '../../services/dispatcher.service';

@Component({
  selector: 'app-dispatcher-history',
  templateUrl: './dispatcherHistory.component.html',
  styleUrls: ['./dispatcherHistory.component.css']
})
export class DispatcherHistoryComponent implements OnInit {
  @ViewChild(DxListComponent) list: DxListComponent;

  public window: Window = window;

  menuItems: any;

  constructor(public dispatcherHistory: DispatcherHistoryService) {

    this.menuItems = [{
        text: 'Delete',
        action: function (e) {
          notify('Deleting ' + e.itemData.first_name + ' ' + e.itemData.last_name + ' from Dispatcher History');
          this.list.instance.reload();
        }.bind(this)
    }];
  }

  ngOnInit() {
  }

}
