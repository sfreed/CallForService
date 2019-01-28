import { Injectable } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Promise<Note[]>;

  constructor(private http: Http) {
    this.notes = this.http.get('assets/data/notes.json')
      .toPromise()
      .then(res => <Note[]> res.json());
  }

  public getNotes(): Promise<Note[]> {
    return this.notes;
  }

}
