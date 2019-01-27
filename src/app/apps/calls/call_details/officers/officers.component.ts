import { Component, OnInit } from '@angular/core';
import { CallsService } from '../../../services/calls.service';
import { Officer } from 'src/app/models/officer';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-call-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OfficersComponent implements OnInit {

  constructor(public callService: CallsService) {}

  ngOnInit() {}

  drop(event: CdkDragDrop<Officer>) {
    if (event.previousContainer === event.container) {
      return;
    }

    const officer = event.item.data;

    this.callService.assignOfficerToActiveCall(officer, this.callService.getActiveCallDetails());
  }

}
