import { Component, Input, OnInit } from '@angular/core';
import { DatasourcesService } from 'src/app/common/datasources/Datasources.service';
import { AdminService } from 'src/app/common/services/admin.service';

@Component({
  selector: 'app-admin-hospital',
  templateUrl: './adminHospital.component.html',
  styleUrls: ['./adminHospital.component.css']
})

export class AdminHospitalComponent implements OnInit {
  isVisible = false;

  constructor(public dsService: DatasourcesService, public adminService: AdminService) {
    adminService.adminFormEmitter.subscribe(
      (data: [string, boolean]) => {
        if (data[0] === 'hospitalPanelVisible') {
          this.isVisible = data[1];
        }
      });
   }

  ngOnInit() {
  }

}
