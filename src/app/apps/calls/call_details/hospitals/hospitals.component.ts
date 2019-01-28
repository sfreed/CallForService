import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/services/calls.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  constructor(public callService: CallsService) { }

  ngOnInit() {
  }
}
