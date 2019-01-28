import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-contact-type',
  templateUrl: './contactType.component.html',
  styleUrls: ['./contactType.component.css']
})
export class ContactTypeComponent implements OnInit {

  constructor(public listDataService: ListsService) { }

  ngOnInit() {
  }

}
