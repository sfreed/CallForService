import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { PersonService } from 'src/app/common/services/lookups/person/Person.service';
import DataSource from 'devextreme/data/data_source';
import * as deepmerge from 'deepmerge';
import { ComplainantService } from 'src/app/common/services/callDetails/Complainant.service';

@Component({
  selector: 'app-complainants',
  templateUrl: './complainants.component.html',
  styleUrls: ['./complainants.component.css']
})
export class ComplainantsComponent implements OnInit {
  rules = { 'X': /[02-9]/ };

  showWaitIndicator = false;
  complainantList: DataSource;
  namePrefix: DataSource;
  nameSuffix: DataSource;

  buttonOptions: any = {
    text: 'Save',
    type: 'normal',
    onClick: this.saveCall.bind(this)
  };

  constructor(public callService: CallsService, private complainanyService: ComplainantService, private personService: PersonService) {
    this.complainantList = this.complainanyService.getComplainantsList();
  }

  ngOnInit() {
    this.namePrefix = this.personService.getNamePrefixList();

    this.nameSuffix = this.personService.getNameSuffixList();
  }

  saveCall(e) {
    this.showWaitIndicator = true;
    this.callService.saveCall(this.callService.getActiveCall()).then(res => this.showWaitIndicator = false);
  }

  updateRow(options) {
    options.newData = deepmerge(options.oldData, options.newData);
  }
}
