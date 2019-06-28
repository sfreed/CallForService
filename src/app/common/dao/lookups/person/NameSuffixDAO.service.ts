import { Injectable } from '@angular/core';
import { BaseDAO } from '../../BaseDAO';
import { AuthenticationService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { URL } from 'src/app/common/models/common/URL.enum';
import { NameSuffix } from 'src/app/common/models/lookups/person/NameSuffix';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NameSuffixDAO extends BaseDAO {

  constructor(private http: HttpClient, private authService: AuthenticationService, private datePipe: DatePipe) {
    super();
    this.store = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      byKey: (key) => {
        return this.getNameSuffix(key);
      },
      load: () => {
          return this.getNameSuffixs();
      },
      insert: (nameSuffix) => {
        return this.addNameSuffix(nameSuffix);
      },
      update: (key, nameSuffix) => {
        return this.updateNameSuffix(key, nameSuffix);
      },
      remove: (key) => {
          return this.deleteNameSuffix(key);
      }
    });
  }

  public getNameSuffixListDS(): DataSource {
    const ds = new DataSource({
      sort: 'nameSuffixDescription',
      store: this.store
    });

    return ds;
  }

  private getNameSuffixs(): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_NAME_SUFFIX_ADDRESS, this.getHttpOptions()).toPromise();
  }

  private getNameSuffix(id): Promise<any> {
    return this.http.get(URL.CALL_FOR_SERVICE_NAME_SUFFIX_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  private addNameSuffix (nameSuffix: NameSuffix): Promise<any> {
    this.updateModel(nameSuffix);

    return this.http.post<any>(URL.CALL_FOR_SERVICE_NAME_SUFFIX_ADDRESS, JSON.stringify(nameSuffix), this.getHttpOptions()).toPromise();
  }

  private updateNameSuffix (id, nameSuffix: NameSuffix): Promise<any> {
    this.updateModel(nameSuffix);

    return this.http.put(URL.CALL_FOR_SERVICE_NAME_SUFFIX_ADDRESS + '/' + id, JSON.stringify(nameSuffix), this.getHttpOptions()).toPromise();
  }

  private deleteNameSuffix (id): Promise<any> {
    return this.http.delete<any>(URL.CALL_FOR_SERVICE_NAME_SUFFIX_ADDRESS + '/' + id, this.getHttpOptions()).toPromise();
  }

  protected updateModel(model: NameSuffix) {
    model.createdUserId = this.authService.getUser().id;
    model.effectiveDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
  }

}
