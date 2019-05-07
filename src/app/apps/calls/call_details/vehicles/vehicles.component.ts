import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { InvolvedVehiclesItem } from 'src/app/common/models/callDetails/InvolvedVehicleItem';
import { CallForServiceDetails } from 'src/app/common/models/callDetails/CallForServiceDetail';
import { State, Street, StreetNameDirection, StreetNameSuffix } from 'src/app/common/models/lookups/LocationLookup';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { VehicleModel, VehicleColor, VehicleType, VehicleStyle, VehicleEngineType, VehicleTransmissionType, VehicleFuelType } from 'src/app/common/models/lookups/VehicleLookup';
import { VehicleLookupService } from 'src/app/common/services/lookup/VehicleLookup.service';
import { ContactType, NamePrefix, NameSuffix, Gender, Race, Ethnicity, HairColor, HairType, EyeColor, Eyewear, FacialHair } from 'src/app/common/models/lookups/PersonLookup';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  involvedVehicles: InvolvedVehiclesItem[];

  states: State[];
  models: VehicleModel[];
  colors: VehicleColor[];
  types: VehicleType[];
  styles: VehicleStyle[];
  engineTypes: VehicleEngineType[];
  transmissionTypes: VehicleTransmissionType[];
  fuelTypes: VehicleFuelType[];

  namePrefixCodes: NamePrefix[];
  lastNameSuffixCodes: NameSuffix[];
  streetCodes: Street[];
  streetNamePreDirectionCodes: StreetNameDirection[];
  streetNameSuffixCodes: StreetNameSuffix[];

  genderCodes: Gender[];
  raceCodes: Race[];
  ethnicityCodes: Ethnicity[];
  hairColorCodes: HairColor[];
  hairCodes: HairType[];
  eyeColorCodes: EyeColor[];
  eyeWearCodes: Eyewear[];
  facialHairCodes: FacialHair[];
  constructor(public callService: CallsService, private locationLookupService: LocationLookupService, private vehicleLookipService: VehicleLookupService,
    private personLookupService: PersonLookupService) {
    this.callService.callDetailsEmitter.subscribe(
      (data: CallForServiceDetails) => {
        this.involvedVehicles = data.involvedVehicles;
      });
  }

  ngOnInit() {
    this.states = this.locationLookupService.stateList;
    this.models = this.vehicleLookipService.vehicleModelList;
    this.colors = this.vehicleLookipService.vehicleColorList;
    this.types = this.vehicleLookipService.vehicleTypeList;
    this.styles = this.vehicleLookipService.vehicleStyleList;
    this.engineTypes = this.vehicleLookipService.vehicleEngineTypeList;
    this.transmissionTypes = this.vehicleLookipService.vehicleTransmissionTypeList;
    this.fuelTypes = this.vehicleLookipService.vehicleFuelTypeList;

    this.namePrefixCodes = this.personLookupService.namePrefixList;
    this.lastNameSuffixCodes = this.personLookupService.nameSuffixList;
    this.streetCodes = this.locationLookupService.streetList;
    this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
    this.streetNameSuffixCodes = this.locationLookupService.StreetNameSuffixList;

    this.genderCodes = this.personLookupService.genderList;
    this.raceCodes = this.personLookupService.raceList;
    this.ethnicityCodes = this.personLookupService.ethnicityList;
    this.hairColorCodes = this.personLookupService.hairColorList;
    this.hairCodes = this.personLookupService.hairTypeList;
    this.eyeColorCodes = this.personLookupService.eyeColorList;
    this.eyeWearCodes = this.personLookupService.eyeWearList;
    this.facialHairCodes = this.personLookupService.facialHairList;
  }

  assignToWreckerService() {
    console.log('clicked');
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
}
