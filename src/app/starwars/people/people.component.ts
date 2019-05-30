import { Component,  OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { Person } from 'src/app/shared/interface/person';
import { ApiResponse } from 'src/app/shared/interface/api-response';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people = {};
  selectedRow = 0;
  currentPage = 1;
  displayedColumns: string[] = [
    'name', 'birth_year', 'gender'
  ];
  
  personDetailsDialogRef: MatDialogRef<PeopleDetailsComponent>;

  constructor(public dialog: MatDialog,
              public http: HttpClient) {
  
    this.readFromLocalStorage();
  }

  ngOnInit() {
    this.fetchPage(this.currentPage);
  }

  openDialog($event, selectedRow?, component?:any,  dialogRef?:any): void {
    this.selectedRow = $event;
   
    this.personDetailsDialogRef = this.dialog.open(PeopleDetailsComponent, {
      data: {results: this.people[this.currentPage].results as Person, index: this.selectedRow},
      panelClass: 'my-panel'
    });

    this.personDetailsDialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    });
   
  }

  fetchPage(page, category = 'people') {
    console.log("this.currentPage:", this.currentPage, "page:", page)
      this.currentPage = page;
    if (this.getData() !== undefined) {
      return;
    }
    this.http.get<ApiResponse[]>(`https://swapi.co/api/${category}/?page=${page}`).subscribe(response => {

        this.people[this.currentPage] = response;  
  
        console.log("fetch: this.data[this.currentPage]: ",this.people[this.currentPage])
        this.savePeopleDataObjectInLocalStorage(page)

        this.people[this.currentPage].results.forEach(element => {
          console.log("url",element.url);
           this.saveInLocalStorage(element, element.url);
        });
    });
  }

  handleChange($event) {
    this.fetchPage($event.pageIndex + 1)
  }

  private getData() {
   return this.people[this.currentPage];
  }

  private saveInLocalStorage(element, url) {
    localStorage.setItem(url, JSON.stringify(element));
  }

  private savePeopleDataObjectInLocalStorage(page) {
    localStorage.setItem('people, page '+page, JSON.stringify(this.people));
  }
  
  readFromLocalStorage() {
    const peopleFromCache = JSON.parse(localStorage.getItem('people, page '+this.currentPage));

    if (peopleFromCache !== null) {
      this.people = peopleFromCache;
    }
  }
}
