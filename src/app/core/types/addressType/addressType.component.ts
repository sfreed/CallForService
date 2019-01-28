import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-address-type',
  templateUrl: './addressType.component.html',
  styleUrls: ['./addressType.component.css']
})
export class AddressTypeComponent implements OnInit {

  constructor(public listDataService: ListsService) { }

  ngOnInit() {
  }

}
