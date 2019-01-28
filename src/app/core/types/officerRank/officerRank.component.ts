import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-officer-rank',
  templateUrl: './officerRank.component.html',
  styleUrls: ['./officerRank.component.css']
})
export class OfficerRankComponent implements OnInit {

  constructor(public listDataService: ListsService) { }

  ngOnInit() {
  }

}
