import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/apps/services/calls.service';

@Component({
  selector: 'app-complaintants',
  templateUrl: './complaintants.component.html',
  styleUrls: ['./complaintants.component.css']
})
export class ComplaintantsComponent implements OnInit {

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

}
