import { Component, OnInit } from '@angular/core';
import { CallsService } from 'src/app/services/calls.service';
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
}
