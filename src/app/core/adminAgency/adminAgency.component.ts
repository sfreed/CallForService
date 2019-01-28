import { Component, OnInit, Input } from '@angular/core';
import { AgencyService } from 'src/app/apps/services/agency.service';
import { ListsService } from 'src/app/apps/services/lists.service';
import { AdminService } from 'src/app/apps/services/admin.service';

@Component({
  selector: 'app-admin-agency',
  templateUrl: './adminAgency.component.html',
  styleUrls: ['./adminAgency.component.css']
})
export class AdminAgencyComponent implements OnInit {
  @Input() isVisible = false;

  constructor(public agencyService: AgencyService, public listDataService: ListsService, public adminService: AdminService) {
    this.adminService.adminFormEmitter.subscribe(
      (data: [string, boolean]) => {
        if (data[0] === 'agencyPanelVisible') {
          this.isVisible = data[1];
        }
      });
   }

  ngOnInit() {
  }
}
