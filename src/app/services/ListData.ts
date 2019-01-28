import { Injectable } from '@angular/core';
import { CallStatus } from 'src/app/models/types/call/CallStatus';
import { CallType } from 'src/app/models/types/call/CallType';
import { AgencyType } from 'src/app/models/types/AgencyType';
import { AddressType } from '../models/types/AddressType';
import { ContactType } from '../models/types/ContactType';
import { OfficerRank } from '../models/types/OfficerRank';

  const callStatusList: CallStatus[] = [
    {'id': '7d47e17c-63d9-437a-b2a8-76a8aacff173', 'description': 'ACTIVE', 'isActive': true, 'isEditable': true},
    {'id': 'ec1b6827-cae6-41ad-9d9c-ceed61607049', 'description': 'CLOSED', 'isActive': true, 'isEditable': true}
  ];

  const callTypeList: CallType[] = [
    {'id': '7d47ert8-63d9-437a-b2a8-76a8aacff173', 'priortyCode': 1, 'code': 'A', 'description': 'traffic', 'isActive': true, 'isEditable': true},
    {'id': 'ec1b6yul-cae6-41ad-9d9c-ceed61607049', 'priortyCode': 2, 'code': 'B', 'description': 'domestic', 'isActive': true, 'isEditable': true}
  ];

  const agencyTypeList: AgencyType[] = [
    {'id': '7d47ert8-63d9-437a-b2a8-76a8aacff173', 'agencyTypeCode': 'PD', 'agencyTypeCodeDescription': 'Law Enforcement', 'isActive': true, 'isEditable': true},
    {'id': 'ec1b6yul-cae6-41ad-9d9c-ceed61607049', 'agencyTypeCode': 'FD', 'agencyTypeCodeDescription': 'Fire and Rescue', 'isActive': true, 'isEditable': true}
  ];

  const addressTypeList: AddressType[] = [
    {'id': '7d47ert8-63d9-437a-b2a8-76a8aacff173', 'addressTypeCode': 'WK', 'addressTypeCodeDescription': 'Work', 'isActive': true, 'isEditable': true},
    {'id': 'ec1b6yul-cae6-41ad-9d9c-ceed61607049', 'addressTypeCode': 'HM', 'addressTypeCodeDescription': 'Home', 'isActive': true, 'isEditable': true}
  ];

  const contactTypeList: ContactType[] = [
    {'id': '7d47ert8-63d9-437a-b2a8-76a8aacff173', 'contactTypeCode': 'FB', 'contactTypeCodeDescription': 'Facebook', 'isActive': true, 'isEditable': true},
    {'id': 'ec1b6yul-cae6-41ad-9d9c-ceed61607049', 'contactTypeCode': 'LI', 'contactTypeCodeDescription': 'Linked In', 'isActive': true, 'isEditable': true}
  ];

  const officerRankList: OfficerRank[] = [
    {'id': '7d47ert8-63d9-437a-b2a8-76a8aacff173', 'officerRankCode': '1', 'officerRankCodeDescription': 'Sergeant', 'isActive': true, 'isEditable': true},
    {'id': 'ec1b6yul-cae6-41ad-9d9c-ceed61607049', 'officerRankCode': '2', 'officerRankCodeDescription': 'Captian', 'isActive': true, 'isEditable': true}
  ];

  @Injectable()
  export class ListDataService {
    getCallTypesList(): CallType[] {
      return callTypeList;
    }

    getCallStatusList(): CallStatus[] {
      return callStatusList;
    }

    getAgencyTypeList(): AgencyType[] {
      return agencyTypeList;
    }

    getAddressTypeList(): AddressType[] {
      return addressTypeList;
    }

    getContactTypeList(): ContactType[] {
      return contactTypeList;
    }

    getOfficerRankList(): OfficerRank[] {
      return officerRankList;
    }
  }


