import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';

@Component({
  selector: 'app-call-details',
  templateUrl: './call_details.component.html',
  styleUrls: ['./call_details.component.css']
})
export class CallDetailsComponent implements OnInit {

  window: Window = window;

  constructor(public callService: CallsService) {}

  ngOnInit() {
  }
}
