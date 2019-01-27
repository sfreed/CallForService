import { Injectable } from '@angular/core';
import { CallStatus } from 'src/app/models/types/CallStatus';
import { CallType } from 'src/app/models/types/CallType';

@Injectable()
export class ListDataService {
    getCallTypesList() {
      return callTypeList;
    }

    getCallStatusList() {
      return callStatusList;
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

