import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-unit-type',
  templateUrl: './unitType.component.html',
  styleUrls: ['./unitType.component.css']
})
export class UnitTypeComponent implements OnInit {

  constructor(public listDataService: ListsService) { }

  ngOnInit() {
  }

}
