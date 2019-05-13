import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CallForServiceDetails } from 'src/app/common/models/callDetails/CallForServiceDetail';
import { State, Street, StreetNameDirection, StreetNameSuffix, City } from 'src/app/common/models/lookups/LocationLookup';
import { LocationLookupService } from 'src/app/common/services/lookup/LocationLookup.service';
import { VehicleModel, VehicleColor, VehicleType, VehicleStyle, VehicleEngineType, VehicleTransmissionType, VehicleFuelType } from 'src/app/common/models/lookups/VehicleLookup';
import { VehicleLookupService } from 'src/app/common/services/lookup/VehicleLookup.service';
import { NamePrefix, NameSuffix, Gender, Race, Ethnicity, HairColor, HairType, EyeColor, Eyewear, FacialHair } from 'src/app/common/models/lookups/PersonLookup';
import { PersonLookupService } from 'src/app/common/services/lookup/PersonLookup.service';
import { WreckerService } from 'src/app/common/models/callDetails/WreckerService';
import { CallForServiceLookupService } from 'src/app/common/services/lookup/CallForServiceLookup.service';
import { WreckerRotation } from 'src/app/common/models/callDetails/WreckerRotation';
import { WreckerRotationService } from 'src/app/common/services/wrecker_rotation.service';
import DataSource from 'devextreme/data/data_source';
import { InvolvedVehicleService } from 'src/app/common/services/involved_vehicle.service';
import { StreetDao } from 'src/app/common/dao/types/StreetDao.service';
import { CityDao } from 'src/app/common/dao/types/CityDao.service';
import { AddressTypeDao } from 'src/app/common/dao/types/AddressTypeDao.service';
import { ZoneDao } from 'src/app/common/dao/types/ZoneDao.service';
import { StateDao } from 'src/app/common/dao/types/StateDao.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './involved_vehicles.component.html',
  styleUrls: ['./involved_vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  involvedVehiclesList: DataSource;

  citySelectionListDisabled = true;

  rules: Object;

  streetNames: DataSource;
  cityCodes: DataSource;
  stateCodes: DataSource;

  models: VehicleModel[];
  colors: VehicleColor[];
  types: VehicleType[];
  styles: VehicleStyle[];
  engineTypes: VehicleEngineType[];
  transmissionTypes: VehicleTransmissionType[];
  fuelTypes: VehicleFuelType[];

  namePrefixCodes: NamePrefix[];
  nameSuffixCodes: NameSuffix[];
  streetNamePreDirectionCodes: StreetNameDirection[];
  streetNameSuffixCodes: StreetNameSuffix[];
  wreckerServiceList: WreckerService[];
  wreckerRotationList: WreckerRotation[];

  genderCodes: Gender[];
  raceCodes: Race[];
  ethnicityCodes: Ethnicity[];
  hairColorCodes: HairColor[];
  hairCodes: HairType[];
  eyeColorCodes: EyeColor[];
  eyeWearCodes: Eyewear[];
  facialHairCodes: FacialHair[];

  constructor(public callService: CallsService, private locationLookupService: LocationLookupService, private vehicleLookipService: VehicleLookupService,
    private personLookupService: PersonLookupService, private callForServiceLookupService: CallForServiceLookupService,
    private wreckerRotationService: WreckerRotationService, private involvedVehicleService: InvolvedVehicleService,
    private streetDao: StreetDao, private cityDao: CityDao, private stateDao: StateDao) {
      this.callService.callDetailsEmitter.subscribe(
      (data: CallForServiceDetails) => {
        this.involvedVehiclesList = this.involvedVehicleService.getInvolvedPersonList();
      });

      this.rules = { 'X': /[02-9]/ };
  }

  ngOnInit() {
    this.streetNames = this.streetDao.getStreetListDS();
    this.cityCodes = this.cityDao.getCityListDS();
    this.stateCodes = this.stateDao.getStateListDS();

    this.models = this.vehicleLookipService.vehicleModelList;
    this.colors = this.vehicleLookipService.vehicleColorList;
    this.types = this.vehicleLookipService.vehicleTypeList;
    this.styles = this.vehicleLookipService.vehicleStyleList;
    this.engineTypes = this.vehicleLookipService.vehicleEngineTypeList;
    this.transmissionTypes = this.vehicleLookipService.vehicleTransmissionTypeList;
    this.fuelTypes = this.vehicleLookipService.vehicleFuelTypeList;

    this.namePrefixCodes = this.personLookupService.namePrefixList;
    this.nameSuffixCodes = this.personLookupService.nameSuffixList;
    this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
    this.streetNameSuffixCodes = this.locationLookupService.streetNameSuffixList;

    this.genderCodes = this.personLookupService.genderList;
    this.raceCodes = this.personLookupService.raceList;
    this.ethnicityCodes = this.personLookupService.ethnicityList;
    this.hairColorCodes = this.personLookupService.hairColorList;
    this.hairCodes = this.personLookupService.hairTypeList;
    this.eyeColorCodes = this.personLookupService.eyeColorList;
    this.eyeWearCodes = this.personLookupService.eyeWearList;
    this.facialHairCodes = this.personLookupService.facialHairList;

    this.wreckerServiceList = this.callForServiceLookupService.wreckerService;
    this.wreckerRotationList = this.callForServiceLookupService.wreckerRotation;
  }

  assignToWreckerService(e) {
    console.log('clicked', this.wreckerServiceList);

    this.wreckerRotationService.getNextRotationId(e.value);
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
