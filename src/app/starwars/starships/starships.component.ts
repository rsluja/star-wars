import { Component,  OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { StarshipsDetailsComponent } from './starships-details/starships-details.component';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  starships = {};
  selectedRow = 0;
  currentPage = 1;
  displayedColumns: string[] = [
    "name", "model", "cost_in_credits", "starship_class"];
 
  starshipsDetailsDialogRef: MatDialogRef<StarshipsDetailsComponent>;

  constructor(public dialog: MatDialog,
              public http: HttpClient) {

                this.readFromLocalStorage();
  }

  ngOnInit() {
    this.fetchPage(this.currentPage);
  }

  openDialog($event): void {
    this.selectedRow = $event;
   
    this.starshipsDetailsDialogRef = this.dialog.open(StarshipsDetailsComponent, {
      data: {results: this.starships[this.currentPage].results, index: this.selectedRow},
      panelClass: 'my-panel'
    });

    this.starshipsDetailsDialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    });
  }

  fetchPage(page, category = 'starships') {
    this.currentPage = page;

    if (this.getData() !== undefined) {
      return;
    }

    this.http.get(`https://swapi.co/api/${category}/?page=${page}`).subscribe(response => {
        this.starships[this.currentPage] = response;

        this.saveStarshipsDataObjectInLocalStorage(page)

        this.starships[this.currentPage].results.forEach(element => {
           this.saveInLocalStorage(element, element.url);
        });
      });
  }

  handleChange($event) {
    this.fetchPage($event.pageIndex + 1)
  }

  private getData() {
    return this.starships[this.currentPage];
  }

  private saveInLocalStorage(element, url) {
    localStorage.setItem(url, JSON.stringify(element));
  }

  private saveStarshipsDataObjectInLocalStorage(page) {
    localStorage.setItem('starships, page '+page, JSON.stringify(this.starships));
  }

  readFromLocalStorage() {
    const starshipsFromCache = JSON.parse(localStorage.getItem('starships, page '+this.currentPage));

    if (starshipsFromCache !== null) {
      this.starships = starshipsFromCache;
    }
  }
}
