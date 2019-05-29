import { Component,  OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {

  planets = {};
  selectedRow = 0;
  currentPage = 1;
  displayedColumns: string[] = ['name', 'population', 'terrain', 'climate'];

  planetDetailsDialogRef: MatDialogRef<PlanetDetailsComponent>;

  constructor(
    public dialog: MatDialog,
    public http: HttpClient) {
      this.readFromLocalStorage();
     }

  ngOnInit() {
    this.fetchPage(this.currentPage);
  }
  
  openDialog($event): void {
    this.selectedRow = $event;
   
    this.planetDetailsDialogRef = this.dialog.open(PlanetDetailsComponent, {
      data: {results: this.planets[this.currentPage].results, index: this.selectedRow}
    });

    this.planetDetailsDialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    });
  }
  
  fetchPage(page, category = 'planets') {
    this.currentPage = page;

    if (this.getData() !== undefined) {
      return;
    }

    this.http.get(`https://swapi.co/api/${category}/?page=${page}`).subscribe(response => {
        this.planets[this.currentPage] = response;

        console.log("fetch: this.data[this.currentPage]: ",this.planets[this.currentPage])
        this.savePeopleDataObjectInLocalStorage(page)

        this.planets[this.currentPage].results.forEach(element => {
          console.log("url",element.url);
           this.saveInLocalStorage(element, element.url);
        });

    });
  }
  
  handleChange($event) {
    this.fetchPage($event.pageIndex + 1)
  }
  
  private getData() {
    console.log("getData: this.data[this.currentPage]: ",this.planets[this.currentPage]);
    console.log("getData: this.data: ",this.planets)
    return this.planets[this.currentPage];
   }

  
   private saveInLocalStorage(element, url) {
    console.log("1element: ", element)  
    console.log("1url: ", url)  
    localStorage.setItem(url, JSON.stringify(element));
  }



  private savePeopleDataObjectInLocalStorage(page) {
    localStorage.setItem('planets, page '+page, JSON.stringify(this.planets));
  }


  readFromLocalStorage() {
    const planetsFromCache = JSON.parse(localStorage.getItem('planets, page '+this.currentPage));

    if (planetsFromCache !== null) {
      this.planets = planetsFromCache;
    }
  }
}
