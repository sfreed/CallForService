import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/services/calls.service';

@Component({
  selector: 'app-call-history',
  templateUrl: './call_history.component.html',
  styleUrls: ['./call_history.component.css']
})
export class CallHistoryComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

}
