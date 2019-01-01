import { Component, OnInit } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import { Officer } from 'src/app/models/officer';
import { AssignedOfficer } from 'src/app/models/assignedOfficer';

@Component({
  selector: 'app-call-officers',
  templateUrl: './call_officers.component.html',
  styleUrls: ['./call_officers.component.css']
})
export class CallOfficersComponent implements OnInit {
  assignedOfficers: AssignedOfficer[];

  callOfficerToolbarItems: any;

  constructor(public callService: CallsService) {
    this.callOfficerToolbarItems = [{
      location: 'center',
      locateInMenu: 'never',
      template: () => {
          return '<div style="font-size: large;">Officers On Call</div>';
      }
    }];
   }

  ngOnInit() {
    this.assignedOfficers = this.callService.getActiveCall().officers;
  }
}
