import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-details',
  templateUrl: './call_details.component.html',
  styleUrls: ['./call_details.component.css']
})
export class CallDetailsComponent implements OnInit {

  callDetailsToolbarItems: any;

  callForms: any = [{
      id: 0,
      name: 'Ambulance'
    }, {
      id: 1,
      name: 'Tow Truck'
    }, {
      id: 2,
      name: 'Involved Person'
    }, {
      id: 3,
      name: 'Complaintant'
    }, {
      id: 4,
      name: 'Vehicle'
    }];

  constructor() {
    this.callDetailsToolbarItems = [
      {
        location: 'center',
        locateInMenu: 'never',
        template: () => {
            return '<div style="font-size: large;">Call Details</div>';
        }
      }
    ];
  }

  ngOnInit() {
  }

  addCallDetail(event, data) {
    console.log('about to add Detail item ', data.selectedItem);
  }
}
