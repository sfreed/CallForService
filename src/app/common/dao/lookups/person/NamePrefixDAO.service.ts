import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { NamePrefix } from 'src/app/common/models/lookups/person/NamePrefix';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NamePrefixDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getNamePrefix(key);
      },
      load: () => {
          return this.getNamePrefixs();
      },
      insert: (namePrefix) => {
        return this.addNamePrefix(namePrefix);
      },
      update: (key, namePrefix) => {
        return this.updateNamePrefix(key, namePrefix);
      },
      remove: (key) => {
          return this.deleteNamePrefix(key);
      }
    });
  }

  public getNamePrefixListDS(): DataSource {
    const ds = new DataSource({
      sort: 'namePrefixDescription',
      store: this.store
    });

    return ds;
  }

  private getNamePrefixs(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_NAME_PREFIX_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getNamePrefix(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_NAME_PREFIX_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addNamePrefix (namePrefix: NamePrefix): Promise<any> {
    this.updateModel(namePrefix);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_NAME_PREFIX_ADDRESS, JSON.stringify(namePrefix), this.getHttpOptions()).toPromise();
  }

  private updateNamePrefix (id, namePrefix: NamePrefix): Promise<any> {
    this.updateModel(namePrefix);

    return this.http.put(URL.CALL_FOR_SERVICE_NAME_PREFIX_ADDRESS + '/' + id, JSON.stringify(namePrefix), this.getHttpOptions()).toPromise();
  }

  private deleteNamePrefix (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_NAME_PREFIX_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: NamePrefix) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
