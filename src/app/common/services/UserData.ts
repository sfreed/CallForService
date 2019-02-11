import { Injectable } from '@angular/core';
import { CallDetail } from 'src/app/common/models/call/CallDetail';
import { DispatcherHistory } from 'src/app/common/models/history';
import { Dispatcher } from 'src/app/common/models/dispatcher';
import { Call } from 'src/app/common/models/call/Call';
import { Hospital } from 'src/app/common/models/sources/Hospital';
import { CallRemark } from '../models/call/CallRemark';
import { CallForServiceUnit } from '../models/call/CallForServiceUnit';


  const historyList: DispatcherHistory[] = [];

  const notesList: CallRemark[] = [];

  const dispatcherList: Dispatcher[] = [
    {'id': '82393b70-0e60-45f6-ab91-3db4b12ed7d5', 'userName': 'sfreed', 'fullName': 'Shane Freed'},
    {'id': '4518664c-e125-42c3-918f-f4c4ed091c14', 'userName': 'mpowell', 'fullName': 'Mark Powell'},
    {'id': 'd8be62cc-ec1e-4289-aa0b-f60dac96dd75', 'userName': 'jnorton', 'fullName': 'Jason Norton'},
    {'id': '26059055-7bcf-4715-9a46-2dce3c4bfec1', 'userName': 'rlong', 'fullName': 'Ray Long'},
    {'id': 'e4342e69-fdf7-4806-a156-b24486f7dac5', 'userName': 'dhosea', 'fullName': 'David Hosea'}
  ];

  const hospitalList: Hospital[] = [
    {'id': '7d47ert8-63d9-437a-b2a8-76a8aacff173', 'hospitalName': 'Clayton County Hospital' , 'isActive': true, 'isUserEditable': true},
    {'id': 'ec1b6yul-cae6-41ad-9d9c-ceed61607049', 'hospitalName': 'Piedmont Hospital Clayton', 'isActive': true, 'isUserEditable': true}
  ];

  const unitList:  CallForServiceUnit[] =  [];

  const callDetailList: CallDetail[] = [];

  const callList: Call[] = [  ];

  @Injectable()
  export class UserDataService {
    getUnitList(): CallForServiceUnit[] {
        return unitList;
    }

    getCallList(): Call[] {
      return callList;
    }

    getCallDetailsList(): CallDetail[] {
      return callDetailList;
    }

    getHistoryList(): DispatcherHistory[] {
      return historyList;
    }

    getDispatcherList(): Dispatcher[] {
      return dispatcherList;
    }

    getHospitalList(): Hospital[] {
      return hospitalList;
    }

    getAvailableUnitList(): CallForServiceUnit[] {
      return unitList;
    }

    getNotesList(): CallRemark[] {
      return notesList;
    }
  }
