import { Component,  OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FilmsDetailsComponent } from './films-details/films-details.component';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  
  films = {};
  singleFilm = {}
  selectedRow = 0;
  currentPage = 1;
  displayedColumns: string[] = [
    'title', 'episode_id', 'opening_crawl', 'release_date'
  ];
  
  filmsDetailsDialogRef: MatDialogRef<FilmsDetailsComponent>;

  constructor(public dialog: MatDialog,
              public http: HttpClient) {

    // odczyt danych z cache - localStorage
    this.readFromLocalStorage();
    
  }

  ngOnInit() {
    this.fetchPage(this.currentPage);
  }

  openDialog($event): void {
    this.selectedRow = $event;
    console.log("this.selectedRow:", this.selectedRow)
    console.log("this.films[this.currentPage].results:", this.films[this.currentPage].results)
    this.filmsDetailsDialogRef = this.dialog.open(FilmsDetailsComponent, {
      data: {results: this.films[this.currentPage].results, index: this.selectedRow},
      panelClass: 'my-panel'
    });

    this.filmsDetailsDialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    });
   
  }

  fetchPage(page, category = 'films') {
    this.currentPage = page;

    if (this.getData()) {
      return;
    }
 
    this.http.get(`https://swapi.co/api/${category}/?page=${page}`).subscribe(response => {
        this.films[this.currentPage] = response;
        this.saveFilmDataObjectInLocalStorage(page);

        this.films[this.currentPage].results.forEach(element => {
          console.log("url",element.url);
           this.saveInLocalStorage(element, element.url);
        });
    });
  }

  handleChange($event) {
    this.fetchPage($event.pageIndex + 1)
  }

  
  
  private getData() {
    console.log("getData: this.data[this.currentPage]: ",this.films[this.currentPage]);
    console.log("getData: this.data: ",this.films)
    return this.films[this.currentPage];
   }

  
  private saveInLocalStorage(element, url) {
    localStorage.setItem(url, JSON.stringify(element));
  }

  private saveFilmDataObjectInLocalStorage(page) {
    localStorage.setItem('films, page '+page, JSON.stringify(this.films));
  }

  readFromLocalStorage() {
    const filmsFromCache = JSON.parse(localStorage.getItem('films, page '+this.currentPage));

    if (filmsFromCache !== null) {
      this.films = filmsFromCache;
    }
  }
}
