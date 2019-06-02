import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { LocationLookupService } from 'src/app/common/services/lookups/LocationLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookups/VehicleLookup.service';
import { PersonLookupService } from 'src/app/common/services/lookups/PersonLookup.service';
import { WreckerService } from 'src/app/common/models/callDetails/vehicle/WreckerService';
import { CallForServiceLookupService } from 'src/app/common/services/lookups/CallForServiceLookup.service';
import { WreckerRotation } from 'src/app/common/models/callDetails/vehicle/WreckerRotation';
import { WreckerRotationService } from 'src/app/common/services/callDetails/WreckerRotation.service';
import DataSource from 'devextreme/data/data_source';
import { InvolvedVehicleService } from 'src/app/common/services/callDetails/InvolvedVehicle.service';
import { StreetNameDirection } from 'src/app/common/models/lookups/location/StreetNameDirection';
import { NamePrefix } from 'src/app/common/models/lookups/person/NamePrefix';
import { NameSuffix } from 'src/app/common/models/lookups/person/NameSuffix';
import { Gender } from 'src/app/common/models/lookups/person/Gender';
import { Race } from 'src/app/common/models/lookups/person/Race';
import { Ethnicity } from 'src/app/common/models/lookups/person/Ethnicity';
import { HairColor } from 'src/app/common/models/lookups/person/HairColor';
import { HairType } from 'src/app/common/models/lookups/person/HairType';
import { EyeColor } from 'src/app/common/models/lookups/person/EyeColor';
import { Eyewear } from 'src/app/common/models/lookups/person/EyeWear';
import { FacialHair } from 'src/app/common/models/lookups/person/FacialHair';
import { VehicleModel } from 'src/app/common/models/lookups/vehicle/VehicleModel';
import { VehicleEngineType } from 'src/app/common/models/lookups/vehicle/VehicleEngineType';
import { VehicleTransmissionType } from 'src/app/common/models/lookups/vehicle/VehicleTransmissionType';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { Street } from 'src/app/common/models/lookups/location/Street';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { VehicleService } from 'src/app/common/services/lookups/vehicle/Vehicle.service';
import { LocationService } from 'src/app/common/services/lookups/location/Location.service';
import * as deepmerge from 'deepmerge';

@Component({
  selector: 'app-vehicles',
  templateUrl: './involved_vehicles.component.html',
  styleUrls: ['./involved_vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  rules = { 'X': /[02-9]/ };

  involvedVehiclesList: DataSource;
  streetNames: DataSource;
  cities: DataSource;
  states: DataSource;
  streetNameSuffixs: DataSource;

  colors: DataSource;
  types: DataSource;
  styles: DataSource;
  fuelTypes: DataSource;
  vehicleModels: DataSource;

  engineTypes: VehicleEngineType[];
  transmissionTypes: VehicleTransmissionType[];
  namePrefixCodes: NamePrefix[];
  nameSuffixCodes: NameSuffix[];
  streetNamePreDirectionCodes: StreetNameDirection[];
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

  popupVisible = false;

  selectedStreet: Street = new Street();

  constructor(public callService: CallsService, private locationLookupService: LocationLookupService, private vehicleLookipService: VehicleLookupService,
    private personLookupService: PersonLookupService, private callForServiceLookupService: CallForServiceLookupService,
    private wreckerRotationService: WreckerRotationService, private involvedVehicleService: InvolvedVehicleService, private locationService: LocationService,
    private vehicleService: VehicleService, private involvedUnitService: InvolvedUnitsService) {
      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.involvedVehiclesList = this.involvedVehicleService.getInvolvedVehicleList();
      });
  }

  ngOnInit() {
    this.streetNames = this.locationService.getStreetList();
    this.cities = this.locationService.getCityList();
    this.states = this.locationService.getStateList();
    this.streetNameSuffixs = this.locationService.getStreetSuffixList();

    this.colors = this.vehicleService.getVehicleColorList();
    this.fuelTypes = this.vehicleService.getVehicleFuelTypeList();
    this.types = this.vehicleService.getVehicleTypeList();
    this.styles = this.vehicleService.getVehicleStyleList();
    this.vehicleModels = this.vehicleService.getVehicleModelList();

    this.engineTypes = this.vehicleLookipService.vehicleEngineTypeList;
    this.transmissionTypes = this.vehicleLookipService.vehicleTransmissionTypeList;
    this.namePrefixCodes = this.personLookupService.namePrefixList;
    this.nameSuffixCodes = this.personLookupService.nameSuffixList;
    this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
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
    this.involvedVehiclesList = this.involvedVehicleService.getInvolvedVehicleList();
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

      this.involvedUnitService.assignUnitToActiveCall(officer);
    }
  }

  searchTag() {

  }

  searchVIN() {

  }

  searchDL () {

  }

  addStreet() {
    this.selectedStreet = new Street();
    this.popupVisible = true;
  }

  editStreet (e) {
    console.log(e);
//    this.streetDao.getStreetListDS().store().byKey(this.callService.getActiveCall().locationPrimary.streetId).then(results => {
//      this.selectedStreet = results;
//      this.popupVisible = true;
//    });
  }

  saveStreet () {
    if (this.selectedStreet.id) {
      this.locationService.getStreetList().store().update(this.selectedStreet.id, this.selectedStreet).then(results => {
        console.log('updating', results);
        this.locationService.getStreetList().reload();
        this.popupVisible = false;
      });
    } else {
      this.locationService.getStreetList().store().insert(this.selectedStreet).then(results => {
        console.log('adding', results);
        this.locationService.getStreetList().reload();
        this.popupVisible = false;
      });
    }
  }

  getCityName(e) {
    if (e) {
      return e.cityName + ', ' + e.stateCode;
    }
  }

  getStreetName(e: Street) {
    if (e) {
      let retVal = '';

      if (e.streetNamePreDirectionCode) {
        retVal += e.streetNamePreDirectionCode + ' ';
      }

      if (e.streetNamePreModifier) {
        retVal += e.streetNamePreModifier + ' ';
      }

      if (e.streetName) {
        retVal += e.streetName + ' ';
      }

      if (e.streetNameSuffixDescription) {
        retVal += e.streetNameSuffixDescription + ' ';
      }

      if (e.streetNamePostModifier) {
        retVal += e.streetNamePostModifier + ' ';
      }

      if (e.streetNamePostDirectionCode) {
        retVal += e.streetNamePostDirectionCode + ' ';
      }

      return  retVal.trim();
    }
  }

  getVehicleModelDisplay(vehicle: VehicleModel) {
    if (vehicle) {
      return vehicle.makeCodeDescription + ' ' + vehicle.vehicleModelDescription;
    }
  }

  updateRow(options) {
    options.newData = deepmerge(options.oldData, options.newData);
  }
}
