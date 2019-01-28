import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-involved-persons',
  templateUrl: './involved_persons.component.html',
  styleUrls: ['./involved_persons.component.css']
})
export class InvolvedPersonsComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

  assignToHospital() {
    console.log('clicked');
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      return;
    }

    if (event.item.element.nativeElement.classList.contains('OFFICER')) {
      const officer = event.item.data;

      this.callService.assignOfficerToActiveCall(officer, this.callService.getActiveCallDetails());
    }

  }
}
