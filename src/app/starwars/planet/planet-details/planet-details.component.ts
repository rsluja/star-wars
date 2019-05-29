import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  planet = null;

  constructor(@Inject(MAT_DIALOG_DATA) public planetsData: any) {
    this.planet = planetsData;
   }

  ngOnInit() {
  }

}
