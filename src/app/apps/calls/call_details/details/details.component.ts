import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/apps/services/calls.service';

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

  constructor(public callService: CallsService) { }

  ngOnInit() {
  }

}
