import { Component, OnInit, Input } from '@angular/core';
import { AgencyService } from 'src/app/apps/services/agency.service';
import { AvailableUnitService } from 'src/app/apps/services/availableUnit.service.';
import { AdminService } from 'src/app/apps/services/admin.service';

@Component({
  selector: 'app-admin-avilable-units',
  templateUrl: './adminAvilableUnits.component.html',
  styleUrls: ['./adminAvilableUnits.component.css']
})
export class AdminAvilableUnitsComponent implements OnInit {
  @Input() isVisible = false;

  constructor(public agencyService: AgencyService, public availableUnitService: AvailableUnitService, public adminService: AdminService) {
    this.adminService.adminFormEmitter.subscribe(
      (data: [string, boolean]) => {
        if (data[0] === 'availableUnitsPanelVisible') {
          this.isVisible = data[1];
        }
      });
   }

  ngOnInit() {
  }

}
