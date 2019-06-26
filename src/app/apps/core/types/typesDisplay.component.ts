import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/common/services/common/Admin.service';

@Component({
  selector: 'app-types-display',
  templateUrl: './typesDisplay.component.html',
  styleUrls: ['./typesDisplay.component.css']
})
export class TypesDisplayComponent implements OnInit {
  isVisible: boolean;

  constructor(public adminService: AdminService) {
    this.adminService.adminFormEmitter.subscribe(
      (data: [string, boolean]) => {
        if (data[0] === 'typesPanelVisible') {
          this.isVisible = data[1];
        }
      });
   }

  ngOnInit() {
  }

}
