import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/common/services/notes.service';
import { CallsService } from 'src/app/common/services/calls.service';

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
    this.callService.getActiveCallDetails().callRemarks.unshift(
      {
        callForServiceId: this.callService.getActiveCallDetails().id,
        createdByUserId: '',
        id: this.callService.getActiveCallDetails().callRemarks.length,
        createdDateTime: d.getHours() + ':' + d.getMinutes(),
        remarks: this.currentNote
      });
    this.currentNote = '';
  }
}
