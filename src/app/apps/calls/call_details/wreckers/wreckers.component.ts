import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/services/calls.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-wreckers',
  templateUrl: './wreckers.component.html',
  styleUrls: ['./wreckers.component.css']
})
export class WreckersComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
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
