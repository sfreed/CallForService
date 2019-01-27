import { Component, Input, OnInit } from '@angular/core';
import { HospitalService } from '../../apps/services/hospital.service';

@Component({
  selector: 'app-admin-hospital',
  templateUrl: './adminHospital.component.html',
  styleUrls: ['./adminHospital.component.css']
})

export class AdminHospitalComponent implements OnInit {
  @Input() visible = false;

  constructor(public hospitalService: HospitalService) { }

  ngOnInit() {
  }

}
