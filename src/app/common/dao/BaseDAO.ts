import { Injectable } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseDAO {
  protected store: CustomStore;

  constructor() {}

  protected getHttpOptions(): any {
    return  {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('id_token')
      })
    };
  }
}
