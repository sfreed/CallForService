import { Component, OnInit } from '@angular/core';
import { LocationLookupService } from 'src/app/common/services/lookups/LocationLookup.service';

@Component({
  selector: 'app-address-type',
  templateUrl: './addressType.component.html',
  styleUrls: ['./addressType.component.css']
})
export class AddressTypeComponent implements OnInit {

  constructor(public locationLookupService: LocationLookupService) { }

  ngOnInit() {
  }

}
