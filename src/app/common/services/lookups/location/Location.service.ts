import { Injectable } from '@angular/core';
import { AddressTypeDAO } from 'src/app/common/dao/lookups/location/AddressTypeDAO.service';
import { CityDAO } from 'src/app/common/dao/lookups/location/CityDAO.service';
import { StateDAO } from 'src/app/common/dao/lookups/location/StateDAO.service';
import { StreetDAO } from 'src/app/common/dao/lookups/location/StreetDAO.service';
import { ZoneDAO } from 'src/app/common/dao/lookups/location/ZoneDAO.service';
import DataSource from 'devextreme/data/data_source';
import { CountyDAO } from 'src/app/common/dao/lookups/location/CountyDAO.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private addressTypeDao: AddressTypeDAO, private streetDao: StreetDAO, private cityDao: CityDAO, private stateDao: StateDAO,
    private zoneDAO: ZoneDAO, private countyDAO: CountyDAO) { }

  getAddressTypeList(): DataSource {
    return this.addressTypeDao.getAddressTypeListDS();
  }

  getStreetList(): DataSource {
    return this.streetDao.getStreetListDS();
  }

  getCityList(): DataSource {
    return this.cityDao.getCityListDS();
  }

  getStateList(): DataSource {
    return this.stateDao.getStateListDS();
  }

  getZoneList(): DataSource {
    return this.zoneDAO.getZoneListDS();
  }

  getCountyList(): DataSource {
    return this.countyDAO.getCountyListDS();
  }
}
