import { Component, OnInit } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import { Officer } from 'src/app/models/officer';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-call-officers',
  templateUrl: './call_officers.component.html',
  styleUrls: ['./call_officers.component.css']
})
export class CallOfficersComponent implements OnInit {
  activeOfficers: Officer[];

  callOfficerToolbarItems: any;

  constructor(public callService: CallsService) {
    this.callOfficerToolbarItems = [
      {
        location: 'center',
        locateInMenu: 'never',
        template: () => {
            return '<div style="font-size: large;">Officers On Call</div>';
        }
      }
    ];
   }

  ngOnInit() {
    this.activeOfficers = this.callService.getActiveCall().officers;
  }
}
