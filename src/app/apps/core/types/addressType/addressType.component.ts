import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/common/services/lookups/location/Location.service';
import DataSource from 'devextreme/data/data_source';
import * as deepmerge from 'deepmerge';

@Component({
  selector: 'app-address-type',
  templateUrl: './addressType.component.html',
  styleUrls: ['./addressType.component.css']
})
export class AddressTypeComponent implements OnInit {

  addressTypes: DataSource;

  constructor(public locationService: LocationService) {
    this.addressTypes = locationService.getAddressTypeList();
  }

  ngOnInit() {
  }

  updateRow(options) {
    options.newData = deepmerge(options.oldData, options.newData);
  }

}
