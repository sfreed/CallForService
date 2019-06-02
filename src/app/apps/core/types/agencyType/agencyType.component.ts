import { Component, OnInit } from '@angular/core';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';

@Component({
  selector: 'app-agency-type',
  templateUrl: './agencyType.component.html',
  styleUrls: ['./agencyType.component.css']
})
export class AgencyTypeComponent implements OnInit {

  constructor(public personLookupService: PersonLookupService) { }

  ngOnInit() {
  }

}
