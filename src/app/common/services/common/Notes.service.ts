import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesList: DataSource;

  constructor() {}

  public getNotes(): DataSource {
    return this.notesList;
  }
}
