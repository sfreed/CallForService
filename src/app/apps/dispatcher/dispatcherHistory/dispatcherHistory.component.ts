import { Component, OnInit, ViewChild } from '@angular/core';
import { DxListComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { DispatcherService } from 'src/app/common/services/master/Dispatcher.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-dispatcher-history',
  templateUrl: './dispatcherHistory.component.html',
  styleUrls: ['./dispatcherHistory.component.css']
})
export class DispatcherHistoryComponent implements OnInit {
  @ViewChild(DxListComponent) list: DxListComponent;

  public window: Window = window;

  menuItems: any;

  historyList: CustomStore;

  constructor(public dispatcherHistory: DispatcherService) {
    this.menuItems = [{
        text: 'Delete',
        action: function (e) {
          notify('Deleting ' + e.itemData.first_name + ' ' + e.itemData.last_name + ' from Dispatcher History');
          this.list.instance.reload();
        }.bind(this)
    }];
  }

  ngOnInit() {
    this.historyList = this.dispatcherHistory.getDispatcherHistoryList();
  }

}
