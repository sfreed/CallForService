import { Component, OnInit } from '@angular/core';
import { DispatcherService } from 'src/app/services/dispatcher.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dispatchers',
  templateUrl: './adminDispatchers.component.html',
  styleUrls: ['./adminDispatchers.component.css']
})
export class AdminDispatchersComponent implements OnInit {
  isVisible = false;

  constructor(public dispatcherService: DispatcherService, public adminService: AdminService) {
    this.adminService.adminFormEmitter.subscribe(
      (data: [string, boolean]) => {
        if (data[0] === 'dispatcherPanelVisible') {
          this.isVisible = data[1];
        }
      });
   }

  ngOnInit() {
  }

}
