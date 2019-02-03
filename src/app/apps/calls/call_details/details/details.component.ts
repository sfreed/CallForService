import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/common/services/calls.service';
import { Call } from 'src/app/common/models/call/Call';
import { DispatcherService } from 'src/app/common/services/dispatcher.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  buttonOptions: any = {
    text: 'Save',
    type: 'success'
  };

  activeCall: Call;

  constructor(public callService: CallsService,  public dispatcherService: DispatcherService) {
    this.callService.callEmitter.subscribe(
      (data: Call) => {
        this.activeCall = data;
      });
  }

  ngOnInit() {
    this.activeCall = this.callService.getActiveCall();
  }

  getComplainantName() {
    if (this.activeCall.complainantPerson.isBusiness) {
      return this.activeCall.complainantPerson.businessName;
    } else {
      return this.activeCall.complainantPerson.fullName;
    }
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
