import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-starships-details',
  templateUrl: './starships-details.component.html',
  styleUrls: ['./starships-details.component.css']
})
export class StarshipsDetailsComponent implements OnInit {

  starship = null;

  constructor(@Inject(MAT_DIALOG_DATA) public starshipsData: any) { 
    this.starship = starshipsData;
  }

  ngOnInit() {
  }

}
