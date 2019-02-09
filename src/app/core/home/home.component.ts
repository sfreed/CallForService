import { Component, ViewChild, OnInit } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';
import { Officer } from 'src/app/common/models/sources/Officer';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';


@Component({
    selector: 'app-root',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [  ]
})

export class HomeComponent implements OnInit {
  @ViewChild(DxDrawerComponent) drawer: DxDrawerComponent;

  officers: Officer[];

  public window: Window = window;

  constructor(private dispatcherService: DispatcherService) {}

  ngOnInit() {
    this.dispatcherService.setHistoryDrawer(this.drawer);
  }
}
