import { Component, ViewChild, OnInit } from '@angular/core';
import { Officer } from './common/models/sources/Officer';
import { DispatcherService } from './common/services/dispatcher.service';
import { DxDrawerComponent } from 'devextreme-angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [  ]
})

export class AppComponent implements OnInit {
  @ViewChild(DxDrawerComponent) drawer: DxDrawerComponent;

  officers: Officer[];

  public window: Window = window;

  constructor(private dispatcherService: DispatcherService) {}

  ngOnInit() {
    this.dispatcherService.setHistoryDrawer(this.drawer);
  }
}
