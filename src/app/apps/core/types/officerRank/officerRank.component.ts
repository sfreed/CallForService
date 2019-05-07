import { Component, OnInit } from '@angular/core';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';


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