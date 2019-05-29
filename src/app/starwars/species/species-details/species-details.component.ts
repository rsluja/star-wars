import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {

  species = null;

  constructor(@Inject(MAT_DIALOG_DATA) public speciesData: any) {
    this.species = speciesData
   }

  ngOnInit() {
  }

}
