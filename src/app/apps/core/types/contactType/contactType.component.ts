import { Component, OnInit } from '@angular/core';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';

@Component({
  selector: 'app-contact-type',
  templateUrl: './contactType.component.html',
  styleUrls: ['./contactType.component.css']
})
export class ContactTypeComponent implements OnInit {

  constructor(public personLookupService: PersonLookupService) { }

  ngOnInit() {
  }

}
