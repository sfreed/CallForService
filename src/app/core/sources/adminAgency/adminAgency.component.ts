import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/common/services/admin.service';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { DatasourcesService } from 'src/app/common/datasources/Datasources.service';

@Component({
  selector: 'app-admin-agency',
  templateUrl: './adminAgency.component.html',
  styleUrls: ['./adminAgency.component.css']
})
export class AdminAgencyComponent implements OnInit {
  @Input() isVisible = false;

  constructor(public dsService: DatasourcesService, public personLookupService: PersonLookupService, public adminService: AdminService) {
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
