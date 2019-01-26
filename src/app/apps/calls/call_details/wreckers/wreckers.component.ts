import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/apps/services/calls.service';

@Component({
  selector: 'app-wreckers',
  templateUrl: './wreckers.component.html',
  styleUrls: ['./wreckers.component.css']
})
export class WreckersComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

}
