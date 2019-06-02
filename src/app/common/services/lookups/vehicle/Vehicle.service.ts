import { Injectable } from '@angular/core';
import { VehicleColorDAO } from 'src/app/common/dao/lookups/vehicle/VehicleColorDAO.service';
import { VehicleFuelTypeDAO } from 'src/app/common/dao/lookups/vehicle/VehicleFuelTypeDAO.service';
import { VehicleTypeDAO } from 'src/app/common/dao/lookups/vehicle/VehicleTypeDAO.service';
import { VehicleStyleDAO } from 'src/app/common/dao/lookups/vehicle/VehicleStyleDAO.service';
import DataSource from 'devextreme/data/data_source';
import { VehicleModelDAO } from 'src/app/common/dao/lookups/vehicle/VehicleModelDAO.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private vehicleColorDAO: VehicleColorDAO, private vehicleFuelTypeDAO: VehicleFuelTypeDAO, private vehicleStyleDAO: VehicleStyleDAO,
    private vehicleTypeDAO: VehicleTypeDAO, private vehicleModelDAO: VehicleModelDAO) { }

  getVehicleColorList(): DataSource {
    return this.vehicleColorDAO.getVehicleColorListDS();
  }

  getVehicleFuelTypeList(): DataSource {
    return this.vehicleFuelTypeDAO.getVehicleFuelTypeListDS();
  }

  getVehicleStyleList(): DataSource {
    return this.vehicleStyleDAO.getVehicleStyleListDS();
  }

  getVehicleTypeList(): DataSource {
    return this.vehicleTypeDAO.getVehicleTypeListDS();
  }

  getVehicleModelList(): DataSource {
    return this.vehicleModelDAO.getVehicleModelListDS();
  }
}
