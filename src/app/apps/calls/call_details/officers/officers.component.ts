import { Component, OnInit } from '@angular/core';
import { CallsService } from '../../../services/calls.service';

@Component({
  selector: 'app-call-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OfficersComponent implements OnInit {

  constructor(public callService: CallsService) {}

  ngOnInit() {}
}
