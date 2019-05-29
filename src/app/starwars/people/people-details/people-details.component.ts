import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.css']
})
export class PeopleDetailsComponent implements OnInit {

  results = [];
  person = null;
  selectedPerson = 0;
   
  constructor(@Inject(MAT_DIALOG_DATA) public peopleData: any, 
              public dialogRef: MatDialogRef<PeopleDetailsComponent>,
              public dialog: MatDialog) {
        // this.results = peopleData.results;
        // this.selectedPerson = peopleData.index;
        // this.person = Object.entries(this.results[this.selectedPerson]);
  }

  ngOnInit() {
  }

  // openPrevious() {
  //   if(this.selectedPerson > 0) {
  //     this.selectedPerson--;
  //     this.person = Object.entries(this.results[this.selectedPerson]);
  //   }
  // }

  // openNext() {
  //   if(this.selectedPerson < 10) {
  //     this.selectedPerson++;
  //     this.person = Object.entries(this.results[this.selectedPerson]);
  //   }
  // }

  // close() {
  //   this.dialog.closeAll();
  // }
}
