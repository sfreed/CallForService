import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-agency-type',
  templateUrl: './agencyType.component.html',
  styleUrls: ['./agencyType.component.css']
})
export class AgencyTypeComponent implements OnInit {

  constructor(public listDataService: ListsService) { }

  ngOnInit() {
  }

}
