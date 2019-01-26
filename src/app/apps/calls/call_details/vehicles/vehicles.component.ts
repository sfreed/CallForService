import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/apps/services/calls.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

  assignToWreckerService() {
    console.log('clicked');
  }

}
