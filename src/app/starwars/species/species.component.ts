import { Component,  OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SpeciesDetailsComponent } from './species-details/species-details.component';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  species = {};
  selectedRow = 0
  currentPage = 1;
  displayedColumns: string[] = [
    'name', 'classification', 'language', 'designation'
  ];

  speciesDetailsDialogRef: MatDialogRef<SpeciesDetailsComponent>;

  constructor(public dialog: MatDialog,
              public http: HttpClient) {
    
    this.readFromLocalStorage();
  }

  ngOnInit() {
    this.fetchPage(this.currentPage);
  }

  openDialog($event): void {
    this.selectedRow = $event;

    this.speciesDetailsDialogRef = this.dialog.open(SpeciesDetailsComponent, {
      data: {results: this.species[this.currentPage].results, index: this.selectedRow}
    });

    this.speciesDetailsDialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();      
    });
  }

  fetchPage(page, category = 'species') {
    this.currentPage = page;

    if (this.getData() !== undefined) {
      return;
    }

    this.http.get(`https://swapi.co/api/${category}/?page=${page}`).subscribe(response => {
        this.species[this.currentPage] = response;

        this.saveSpeciesDataObjectInLocalStorage(page)

        this.species[this.currentPage].results.forEach(element => {
          console.log("url",element.url);
           this.saveInLocalStorage(element, element.url);
        });
  
      });
  }

  handleChange($event) {
    this.fetchPage($event.pageIndex + 1)
  }

  private getData() {
    console.log("getData: this.data[this.currentPage]: ",this.species[this.currentPage]);
    console.log("getData: this.data: ",this.species)
    return this.species[this.currentPage];
   }

  
   private saveInLocalStorage(element, url) {
    console.log("1element: ", element)  
    console.log("1url: ", url)  
    localStorage.setItem(url, JSON.stringify(element));
  }

  private saveSpeciesDataObjectInLocalStorage(page) {
    localStorage.setItem('species, page '+page, JSON.stringify(this.species));
  }

  readFromLocalStorage() {
    const speciesFromCache = JSON.parse(localStorage.getItem('species, page '+this.currentPage));

    if (speciesFromCache !== null) {
      this.species = speciesFromCache;
    }
  }

}
