import { Component, ViewChild, OnInit } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';

@Component({
    selector: 'app-root',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [  ]
})

export class HomeComponent implements OnInit {
  @ViewChild(DxDrawerComponent) drawer: DxDrawerComponent;

  public window: Window = window;

  constructor(private dispatcherService: DispatcherService) {}

  ngOnInit() {
    this.dispatcherService.setHistoryDrawer(this.drawer);
  }
}
