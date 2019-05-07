import { Component, OnInit } from '@angular/core';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';


@Component({
  selector: 'app-unit-type',
  templateUrl: './unitType.component.html',
  styleUrls: ['./unitType.component.css']
})
export class UnitTypeComponent implements OnInit {

  constructor(public personLookupType: PersonLookupService) { }

  ngOnInit() {
  }

}
