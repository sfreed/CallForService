import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallsService } from '../services/calls.service';
import { BaseDAO } from './BaseDAO';
import { BaseModel } from '../models/common/BaseModel';
import { InvolvedPersonItem } from '../models/callDetails/InvolvedPersonItem';
import { AuthenticationService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonDAO extends BaseDAO {

    constructor(private http: HttpClient, private callService: CallsService, private authService: AuthenticationService) {
      super();
      this.store = new CustomStore({
        key: 'id',
        byKey: (key) => {
          return this.getInvolvedPerson(key);
        },
        load: () => {
          return this.getInvolvedPersons();
        },
        insert: (person) => {
          return this.addInvolvedPerson(person);
        },
        update: (key, person: InvolvedPersonItem) => {
          return this.updateInvolvedPerson(key, person);
        },
        remove: (key) => {
            return this.deleteInvolvedPerson(key);
        }
      });
    }

    public getInvolvedPersonsDS(): DataSource {
      const ds =   new DataSource({
        store: this.store
      });

      return ds;
    }

    private getInvolvedPersons(): Promise<any> {
      return this.http.get<any>(this.endpoint + 'CallForServiceInvolvedPerson?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise();
    }
    private getInvolvedPerson(id): Promise<any> {
      return this.http.get<any>(this.endpoint + 'CallForServiceInvolvedPerson/' + id + '?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise();
    }

    private addInvolvedPerson (involvedPerson: InvolvedPersonItem): Promise<any> {
      this.updateModel(involvedPerson);

      console.log('inserting person', JSON.stringify(involvedPerson));

      return this.http.post<any>(this.endpoint + 'CallForServiceInvolvedPerson', JSON.stringify(involvedPerson), this.getHttpOptions()).toPromise();
    }

    private updateInvolvedPerson (id, involvedPerson: InvolvedPersonItem): Promise<any> {
      this.updateModel(involvedPerson);

      console.log('updating person', JSON.stringify(involvedPerson));
      console.log('merge with.....', JSON.stringify(this.callService.getActiveCallDetails().involvedPersons.filter( value => value.id === involvedPerson.id )));

      return this.http.put(this.endpoint + 'CallForServiceInvolvedPerson/' + id, JSON.stringify(involvedPerson), this.getHttpOptions()).toPromise();
    }

    private deleteInvolvedPerson (id): Promise<any> {
      return this.http.delete<any>(this.endpoint + 'CallForServiceInvolvedPerson/' + id, this.getHttpOptions()).toPromise();
    }

    protected updateModel(model: InvolvedPersonItem) {
      model.callForServiceId = this.callService.getActiveCall().id;
      model.createdUserId = this.authService.getUser().id;
      model.effectiveDateTime = new Date().toISOString();
      if (model.involvedPerson) {
        model.involvedPerson.createdUserId = this.authService.getUser().id;
        model.involvedPerson.effectiveDateTime = new Date().toISOString();
      }

      if (model.personAddress) {
        model.personAddress.createdUserId = this.authService.getUser().id;
        model.personAddress.effectiveDateTime = new Date().toISOString();
      }
    }
}
