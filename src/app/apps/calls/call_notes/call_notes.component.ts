import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';

import { CallsService } from '../../services/calls.service';

@Component({
  selector: 'app-call-notes',
  templateUrl: './call_notes.component.html',
  styleUrls: ['./call_notes.component.css']
})
export class CallNotesComponent implements OnInit {
  callNotesToolbarItems: any;

  currentNote: string;

  constructor(public notesService: NotesService, public callService: CallsService) {
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

  ngOnInit() {}

  saveNote(e) {
    const d: Date = new Date();
    this.callService.getActiveCall().notes.unshift({id: this.callService.getActiveCall().notes.length, time: d.getHours() + ':' + d.getMinutes(), text: this.currentNote});
    this.currentNote = '';
  }
}
