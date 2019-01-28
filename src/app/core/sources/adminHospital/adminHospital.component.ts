import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-admin-hospital',
  templateUrl: './adminHospital.component.html',
  styleUrls: ['./adminHospital.component.css']
})

export class AdminHospitalComponent implements OnInit {
  isVisible = false;

  constructor(public hospitalService: HospitalService, public adminService: AdminService) {
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
