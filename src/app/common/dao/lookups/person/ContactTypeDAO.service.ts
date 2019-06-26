import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { ContactType } from 'src/app/common/models/lookups/person/ContactType';

@Injectable({
  providedIn: 'root'
})
export class ContactTypeDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getContactType(key);
      },
      load: () => {
          return this.getContactTypes();
      },
      insert: (contactType) => {
        return this.addContactType(contactType);
      },
      update: (key, contactType) => {
        return this.updateContactType(key, contactType);
      },
      remove: (key) => {
          return this.deleteContactType(key);
      }
    });
  }

  public getContactTypeListDS(): DataSource {
    const ds = new DataSource({
      sort: 'contactTypeCodeDescription',
      store: this.store
    });

    return ds;
  }

  private getContactTypes(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CONTACT_TYPE_ADDRESS, this.getHttpOptions()).toPromise()
    .then(results => {
      console.log('Contact Types', results);
      return results;
    });
  }

  private getContactType(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_CONTACT_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addContactType (contactType: ContactType): Promise<any> {
    this.updateModel(contactType);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_CONTACT_TYPE_ADDRESS, JSON.stringify(contactType), this.getHttpOptions()).toPromise();
  }

  private updateContactType (id, contactType: ContactType): Promise<any> {
    this.updateModel(contactType);

    return this.http.put(URL.CALL_FOR_SERVICE_CONTACT_TYPE_ADDRESS + '/' + id, JSON.stringify(contactType), this.getHttpOptions()).toPromise();
  }

  private deleteContactType (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_CONTACT_TYPE_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: ContactType) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = new Date().toDateString();
  }

}
