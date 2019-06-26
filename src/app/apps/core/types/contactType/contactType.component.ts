import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/common/services/lookups/person/Person.service';
import DataSource from 'devextreme/data/data_source';
import * as deepmerge from 'deepmerge';

@Component({
  selector: 'app-contact-type',
  templateUrl: './contactType.component.html',
  styleUrls: ['./contactType.component.css']
})
export class ContactTypeComponent implements OnInit {

  contactTypeList: DataSource;

  constructor(public personService: PersonService ) {
    this.contactTypeList = this.personService.getContactTypeList();
  }

  ngOnInit() {
  }

  updateRow(options) {
    options.newData = deepmerge(options.oldData, options.newData);
  }

}
