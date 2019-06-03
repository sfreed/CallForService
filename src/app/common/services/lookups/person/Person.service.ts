import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { ContactTypeDAO } from 'src/app/common/dao/lookups/person/ContactTypeDAO.service';
import { EthnicityDAO } from 'src/app/common/dao/lookups/person/EthnicityDAO.service';
import { EyeColorDAO } from 'src/app/common/dao/lookups/person/EyeColorDAO.service';
import { EyeWearDAO } from 'src/app/common/dao/lookups/person/EyeWearDAO.service';
import { FacialHairDAO } from 'src/app/common/dao/lookups/person/FacialHairDAO.service';
import { HairColorDAO } from 'src/app/common/dao/lookups/person/HairColorDAO.service';
import { HairTypeDAO } from 'src/app/common/dao/lookups/person/HairTypeDAO.service';
import { NamePrefixDAO } from 'src/app/common/dao/lookups/person/NamePrefixDAO.service';
import { NameSuffixDAO } from 'src/app/common/dao/lookups/person/NameSuffixDAO.service';
import { OfficerRankDAO } from 'src/app/common/dao/lookups/person/OfficerRankDAO.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private contactTypeDAO: ContactTypeDAO, private ethnicityDAO: EthnicityDAO, private eyeColorDAO: EyeColorDAO, private eyewearDAO: EyeWearDAO,
    private facialHairDAO: FacialHairDAO, private hairColorDAO: HairColorDAO, private hairTypeDAO: HairTypeDAO, private namePrefixDAO: NamePrefixDAO,
    private nameSuffixDAO: NameSuffixDAO, private officerRankDAO: OfficerRankDAO) { }

  getContactTypeList(): DataSource {
    return this.contactTypeDAO.getContactTypeListDS();
  }

  getEthicityList(): DataSource {
    return this.ethnicityDAO.getEthnicityListDS();
  }

  getEyeColorList(): DataSource {
    return this.eyeColorDAO.getEyeColorListDS();
  }

  getEyewearList(): DataSource {
    return this.eyewearDAO.getEyeWearListDS();
  }

  getFacialHairList(): DataSource {
    return this.facialHairDAO.getFacialHairListDS();
  }

  getHairColorList(): DataSource {
    return this.hairColorDAO.getHairColorListDS();
  }

  getHairTypeList(): DataSource {
    return this.hairTypeDAO.getHairTypeListDS();
  }

  getNamePrefixList(): DataSource {
    return this.namePrefixDAO.getNamePrefixListDS();
  }

  getNameSuffixList(): DataSource {
    return this.nameSuffixDAO.getNameSuffixListDS();
  }

  getOfficerRamkList(): DataSource {
    return this.officerRankDAO.getOfficerRankListDS();
  }
}
