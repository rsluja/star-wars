import { Component,  OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PeopleDetailsComponent } from './people-details/people-details.component';

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
    'name', 'hair_color', 'height', 'mass'
  ];
  


  personDetailsDialogRef: MatDialogRef<PeopleDetailsComponent>;

  constructor(public dialog: MatDialog,
              public http: HttpClient) {
  
    this.readFromLocalStorage();
  }

  ngOnInit() {
    this.fetchPage(this.currentPage);
  }

  openDialog($event): void {
    this.selectedRow = $event;
   
    this.personDetailsDialogRef = this.dialog.open(PeopleDetailsComponent, {
      data: {results: this.people[this.currentPage].results, index: this.selectedRow}
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
    this.http.get(`https://swapi.co/api/${category}/?page=${page}`).subscribe(response => {

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
   console.log("getData: this.data[this.currentPage]: ",this.people[this.currentPage]);
   console.log("getData: this.data: ",this.people)
   return this.people[this.currentPage];
  }

  private saveInLocalStorage(element, url) {
    console.log("1element: ", element)  
    console.log("1url: ", url)  
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
