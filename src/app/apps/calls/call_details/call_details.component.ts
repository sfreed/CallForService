import { Component, OnInit } from '@angular/core';
import { CallsService } from '../../services/calls.service';

@Component({
  selector: 'app-call-details',
  templateUrl: './call_details.component.html',
  styleUrls: ['./call_details.component.css']
})
export class CallDetailsComponent implements OnInit {

  constructor(public callService: CallsService) {}

  ngOnInit() {
  }
}
