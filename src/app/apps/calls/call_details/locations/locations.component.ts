import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PatrolArea, Zone, City, County, AddressType, Street, StreetNameDirection, StreetNameSuffix, State } from 'src/app/common/models/lookups/LocationLookup';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  addressCodes: AddressType[];
  streetNames: Street[];
  streetNamePreDirectionCodes: StreetNameDirection[];
  streetNameSuffixCodes: StreetNameSuffix[];
  countyCodes: County[];
  cityCodes: City[];
  states: State[];
  zoneCodes: Zone[];
  patrolAreaCodes: PatrolArea[];

  buttonOptions: any = {
    text: 'Save',
    type: 'success',
    onClick: this.saveCall.bind(this)
  };

  activeCall: CallForService;

  constructor(public callService: CallsService, private locationLookupService: LocationLookupService) {
    this.callService.callEmitter.subscribe(
      (data: CallForService) => {
        this.activeCall = data;
      });
  }

  ngOnInit() {
    this.activeCall = this.callService.getActiveCall();

    this.addressCodes = this.locationLookupService.addressTypeList;
    this.streetNames = this.locationLookupService.streetList;
    this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
    this.streetNameSuffixCodes = this.locationLookupService.streetNameSuffixList;
    this.countyCodes = this.locationLookupService.countyList;
    this.cityCodes = this.locationLookupService.cityList;
    this.states = this.locationLookupService.stateList;
    this.zoneCodes = this.locationLookupService.zoneList;
    this.patrolAreaCodes = this.locationLookupService.patrolAreaList;
  }


  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }

    if (event.item.element.nativeElement.classList.contains('OFFICER')) {
      const officer = event.item.data;

      this.callService.assignUnitToActiveCall(officer);
    }

  }

  saveCall(e) {
    console.log('saving', this.activeCall);

    this.callService.saveCall(this.activeCall);
  }
}
