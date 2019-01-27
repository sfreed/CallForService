import { Injectable } from '@angular/core';
import { CallStatus } from 'src/app/models/types/call/CallStatus';
import { CallType } from 'src/app/models/types/call/CallType';
import { AgencyType } from 'src/app/models/types/AgencyType';

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
  }

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


