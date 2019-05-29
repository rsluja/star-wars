import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicle = null;

  constructor(@Inject(MAT_DIALOG_DATA) public vehiclesData: any) { 
    this.vehicle = vehiclesData;
  }

  ngOnInit() {
  }

}
