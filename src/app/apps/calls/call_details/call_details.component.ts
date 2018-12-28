import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-details',
  templateUrl: './call_details.component.html',
  styleUrls: ['./call_details.component.css']
})
export class CallDetailsComponent implements OnInit {

  callDetailsToolbarItems: any;

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

}
