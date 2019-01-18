import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/apps/services/calls.service';

@Component({
  selector: 'app-tow-trucks',
  templateUrl: './tow_trucks.component.html',
  styleUrls: ['./tow_trucks.component.css']
})
export class TowTrucksComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

}
