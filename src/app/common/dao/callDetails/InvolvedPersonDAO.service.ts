import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { CallsService } from '../../services/call/Calls.service';
import { BaseDAO } from '../BaseDAO';
import { InvolvedPersonItem } from '../../models/callDetails/InvolvedPersonItem';
import { AuthenticationService } from '../../auth/auth.service';
import { URL } from '../../models/common/URL.enum';

@Injectable({
  providedIn: 'root'
})
export class InvolvedPersonDAO extends BaseDAO {

    constructor(private http: HttpClient, private callService: CallsService, private authService: AuthenticationService) {
      super();
      this.store = new CustomStore({
        key: 'personId',
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
      return this.http.get<any>(URL.CALL_FOR_SERVICE_INVOLVED_PERSON_ADDRESS + '?callId=' + this.callService.getActiveCall().id, this.getHttpOptions()).toPromise()
        .then(results => {
          console.log('involved Persons List', results);
          return results;
        });
    }
    private getInvolvedPerson(id): Promise<any> {
      return this.http.get<any>(URL.CALL_FOR_SERVICE_INVOLVED_PERSON_ADDRESS + '?callId=' + this.callService.getActiveCall().id + '&personId=' + id, this.getHttpOptions()).toPromise();
    }

    private addInvolvedPerson (involvedPerson: InvolvedPersonItem): Promise<any> {
      this.updateModel(involvedPerson);

      return this.http.post<any>(URL.CALL_FOR_SERVICE_INVOLVED_PERSON_ADDRESS, JSON.stringify(involvedPerson), this.getHttpOptions()).toPromise();
    }

    private updateInvolvedPerson (id, involvedPerson: InvolvedPersonItem): Promise<any> {
      this.updateModel(involvedPerson);

      return this.http.put(URL.CALL_FOR_SERVICE_INVOLVED_PERSON_ADDRESS + '?callId=' + this.callService.getActiveCall().id + '&personId=' + id, JSON.stringify(involvedPerson), this.getHttpOptions()).toPromise();
    }

    private deleteInvolvedPerson (id): Promise<any> {
      return this.http.delete<any>(URL.CALL_FOR_SERVICE_INVOLVED_PERSON_ADDRESS + '?callId=' + this.callService.getActiveCall().id + '&personId=' + id, this.getHttpOptions()).toPromise();
    }

    protected updateModel(model: InvolvedPersonItem) {
      model.callForServiceId = this.callService.getActiveCall().id;
      model.createdUserId = this.authService.getUser().id;
      model.effectiveDateTime = new Date().toISOString();
      if (model.involvedPerson) {
        model.involvedPerson.createdUserId = this.authService.getUser().id;
        model.involvedPerson.effectiveDateTime = new Date().toISOString();
      }

      if (model.involvedPerson) {
        model.involvedPerson.location.createdUserId = this.authService.getUser().id;
        model.involvedPerson.location.effectiveDateTime = new Date().toISOString();
      }
    }
}
