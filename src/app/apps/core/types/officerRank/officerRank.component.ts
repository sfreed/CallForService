import { Component, OnInit } from '@angular/core';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';


@Component({
  selector: 'app-officer-rank',
  templateUrl: './officerRank.component.html',
  styleUrls: ['./officerRank.component.css']
})
export class OfficerRankComponent implements OnInit {

  constructor(public personLookupService: PersonLookupService) { }

  ngOnInit() {
  }

}
