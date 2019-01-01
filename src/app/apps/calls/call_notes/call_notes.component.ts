import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-call-notes',
  templateUrl: './call_notes.component.html',
  styleUrls: ['./call_notes.component.css']
})
export class CallNotesComponent implements OnInit {

  callNotesToolbarItems: any;

  notes: Note[] = [];

  currentNote: string;

  constructor(public notesService: NotesService) {
    this.callNotesToolbarItems = [
      {
        location: 'center',
        locateInMenu: 'never',
        template: () => {
            return '<div style="font-size: large;">Live Notes</div>';
        }
      }
    ];
  }

  ngOnInit() {
  }

  saveNote(e) {
    const d: Date = new Date();
    this.notes.unshift({id: this.notes.length, time: d.getHours() + ':' + d.getMinutes(), text: this.currentNote});
    this.currentNote = '';
  }
}
