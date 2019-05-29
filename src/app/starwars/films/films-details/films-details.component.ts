import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-films-details',
  templateUrl: './films-details.component.html',
  styleUrls: ['./films-details.component.css']
})
export class FilmsDetailsComponent implements OnInit {

  film = null;

  constructor(@Inject(MAT_DIALOG_DATA) public filmsData: any) {
    this.film = filmsData;
   }

  ngOnInit() {
  }

}
