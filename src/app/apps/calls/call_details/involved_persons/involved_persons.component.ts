import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/apps/services/calls.service';

@Component({
  selector: 'app-involved-persons',
  templateUrl: './involved_persons.component.html',
  styleUrls: ['./involved_persons.component.css']
})
export class InvolvedPersonsComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

  assignToHospital() {
    console.log('clicked');
  }
}
