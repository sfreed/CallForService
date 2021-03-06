import { Component, OnInit, ViewChild } from '@angular/core';
import { CallsService } from 'src/app/common/services/call/Calls.service';
import { LocationLookupService } from 'src/app/common/services/lookups/location/LocationLookup.service';
import { VehicleLookupService } from 'src/app/common/services/lookups/vehicle/VehicleLookup.service';
import { PersonLookupService } from 'src/app/common/services/lookups/person/PersonLookup.service';
import DataSource from 'devextreme/data/data_source';
import { InvolvedVehicleService } from 'src/app/common/services/callDetails/InvolvedVehicle.service';
import { StreetNameDirection } from 'src/app/common/models/lookups/location/StreetNameDirection';
import { Gender } from 'src/app/common/models/lookups/person/Gender';
import { Race } from 'src/app/common/models/lookups/person/Race';
import { VehicleModel } from 'src/app/common/models/lookups/vehicle/VehicleModel';
import { VehicleEngineType } from 'src/app/common/models/lookups/vehicle/VehicleEngineType';
import { VehicleTransmissionType } from 'src/app/common/models/lookups/vehicle/VehicleTransmissionType';
import { InvolvedUnitsService } from 'src/app/common/services/callDetails/InvolvedUnit.service';
import { Street } from 'src/app/common/models/lookups/location/Street';
import { CallForService } from 'src/app/common/models/call/CallForService';
import { VehicleService } from 'src/app/common/services/lookups/vehicle/Vehicle.service';
import { LocationService } from 'src/app/common/services/lookups/location/Location.service';
import * as deepmerge from 'deepmerge';
import { PersonService } from 'src/app/common/services/lookups/person/Person.service';
import { StreetNameSuffix } from 'src/app/common/models/lookups/location/StreetNameSuffix';
import { WreckerService } from 'src/app/common/services/callDetails/Wrecker.service';
import { InvolvedVehiclesItem } from 'src/app/common/models/callDetails/InvolvedVehicleItem';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { IdentificationClassService } from 'src/app/common/services/lookups/person/IdentificationClass.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './involved_vehicles.component.html',
  styleUrls: ['./involved_vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  @ViewChild('wreckerServer') wreckerServerSelect: DxSelectBoxComponent;

  rules = { 'X': /[02-9]/ };
  ssnRules = { 'X': /[0-9]/ };

  involvedVehiclesList: DataSource;
  streetNames: DataSource;
  cities: DataSource;
  states: DataSource;

  colors: DataSource;
  types: DataSource;
  styles: DataSource;
  fuelTypes: DataSource;
  vehicleModels: DataSource;

  namePrefixCodes: DataSource;
  nameSuffixCodes: DataSource;
  ethnicityCodes: DataSource;
  hairColorCodes: DataSource;
  hairTypeCodes: DataSource;
  eyeWearCodes: DataSource;
  eyeColorCodes: DataSource;
  facialHairCodes: DataSource;
  idClass: DataSource;

  wreckerRotationList: DataSource;
  wreckerServiceList: DataSource;

  engineTypes: VehicleEngineType[];
  transmissionTypes: VehicleTransmissionType[];
  streetNamePreDirectionCodes: StreetNameDirection[];

  streetNameSuffixs: StreetNameSuffix[];

  genderCodes: Gender[];
  raceCodes: Race[];

  addStreetPopupVisible = false;
  addWreckerPopupVisible = false;

  selectedStreet: Street = new Street();
  selectedVehicle: InvolvedVehiclesItem;

  wreckerRotationSelectOptions = {};
  wreckerServiceSelectOptions = {};

  constructor(public callService: CallsService, private locationLookupService: LocationLookupService, private vehicleLookipService: VehicleLookupService,
    private personLookupService: PersonLookupService, private wreckerService: WreckerService, private involvedVehicleService: InvolvedVehicleService,
    private locationService: LocationService, private vehicleService: VehicleService, private involvedUnitService: InvolvedUnitsService,
    private personService: PersonService, private identificationClassService: IdentificationClassService) {
      this.callService.callEmitter.subscribe((data: CallForService) => {
        this.involvedVehiclesList = this.involvedVehicleService.getInvolvedVehicleList();
      });

      this.idClass = this.identificationClassService.getIdentificationClassListDS();
  }

  ngOnInit() {
    this.streetNames = this.locationService.getStreetList();
    this.cities = this.locationService.getCityList();
    this.states = this.locationService.getStateList();

    this.colors = this.vehicleService.getVehicleColorList();
    this.fuelTypes = this.vehicleService.getVehicleFuelTypeList();
    this.types = this.vehicleService.getVehicleTypeList();
    this.styles = this.vehicleService.getVehicleStyleList();
    this.vehicleModels = this.vehicleService.getVehicleModelList();
    this.namePrefixCodes = this.personService.getNamePrefixList();
    this.nameSuffixCodes = this.personService.getNameSuffixList();
    this.ethnicityCodes = this.personService.getEthicityList();
    this.hairColorCodes = this.personService.getHairColorList();
    this.hairTypeCodes = this.personService.getHairTypeList();
    this.eyeWearCodes = this.personService.getEyewearList();
    this.eyeColorCodes = this.personService.getEyeColorList();
    this.facialHairCodes = this.personService.getFacialHairList();
    this.wreckerRotationList = this.wreckerService.getWreckerRoationList();
    this.wreckerServiceList = this.wreckerService.getWreckerServiceList();

    this.streetNameSuffixs = this.locationLookupService.streetNameSuffix;
    this.engineTypes = this.vehicleLookipService.vehicleEngineTypeList;
    this.transmissionTypes = this.vehicleLookipService.vehicleTransmissionTypeList;
    this.streetNamePreDirectionCodes = this.locationLookupService.streetNameDirectionList;
    this.genderCodes = this.personLookupService.genderList;
    this.raceCodes = this.personLookupService.raceList;

    this.involvedVehiclesList = this.involvedVehicleService.getInvolvedVehicleList();

    this.wreckerRotationSelectOptions =  {
      stylingMode: 'filled',
      dataSource: this.wreckerRotationList,
      valueExpr: 'id',
      displayExpr: 'rotationDescription',
      onSelectionChanged: this.assignToWreckerService.bind(this)
    };

   this.wreckerServiceSelectOptions =  {
      stylingMode: 'filled',
      dataSource: this.wreckerServiceList,
      valueExpr: 'id',
      displayExpr: 'wreckerServiceName'
    };
  }

  assignToWreckerService(e) {
    this.wreckerService.getNextRotationId(e.selectedItem.id).then(results => {
      this.selectedVehicle.wreckerServerId = results;
    });
  }
  searchTag() {

  }

  searchVIN() {

  }

  searchDL () {

  }

  addStreet() {
    this.selectedStreet = new Street();
    this.addStreetPopupVisible = true;
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
        this.addStreetPopupVisible = false;
      });
    } else {
      this.locationService.getStreetList().store().insert(this.selectedStreet).then(results => {
        console.log('adding', results);
        this.locationService.getStreetList().reload();
        this.addStreetPopupVisible = false;
      });
    }
  }

  cancelStreet(e) {
    this.addStreetPopupVisible = false;
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
    console.log('update called');
    options.newData = deepmerge(options.oldData, options.newData);
  }

  getInvolvedVehicle(e) {
    this.selectedVehicle = e.data;
  }

  showWreckerService(e) {
    this.selectedVehicle = e.row.data;
    this.addWreckerPopupVisible = true;

    e.event.preventDefault();
  }

  sameAsDriver(e) {
    console.log('clicked', e);
  }

  checkYearLength(e) {
    console.log('checkYearLength', e);
  }

  saveWrecker() {

    console.log('saving', this.selectedVehicle);

    this.selectedVehicle.isWrecker = true;
    this.involvedVehiclesList.store().update(this.selectedVehicle.vehicleId, this.selectedVehicle).then(result => {
      this.addWreckerPopupVisible = false;
    });
  }
}
