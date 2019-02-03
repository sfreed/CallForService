import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/common/services/admin.service';
import { DatasourcesService } from 'src/app/common/datasources/Datasources.service';

@Component({
  selector: 'app-admin-officers',
  templateUrl: './adminOfficers.component.html',
  styleUrls: ['./adminOfficers.component.css']
})
export class AdminOfficersComponent implements OnInit {
  @Input() isVisible = false;

  constructor(public dsService: DatasourcesService, public adminService: AdminService) {
    this.adminService.adminFormEmitter.subscribe(
      (data: [string, boolean]) => {
        if (data[0] === 'officerPanelVisible') {
          this.isVisible = data[1];
        }
      });
  }

  ngOnInit() {
  }

}
