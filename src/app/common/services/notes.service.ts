import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { UserDataService } from './UserData';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesList: DataSource;

  constructor(private dataService: UserDataService) {
    this.notesList = new DataSource({
      store : new ArrayStore({
        key : 'id',
        data : dataService.getNotesList()
      })
    });
  }

  public getNotes(): DataSource {
    return this.notesList;
  }
}
