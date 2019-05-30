import { Component,  OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicles = {};
  selectedRow = 0;
  currentPage = 1;
  displayedColumns: string[] = [
    'name', 'model', 'manufacturer', 'cost_in_credits'];
 
  vehicleDetailsDialogRef: MatDialogRef<VehicleDetailsComponent>;

  constructor(public dialog: MatDialog,
              public http: HttpClient) {

                this.readFromLocalStorage();
  }

  ngOnInit() {
    this.fetchPage(this.currentPage);
  }

  openDialog($event): void {
    this.selectedRow = $event;
   
    this.vehicleDetailsDialogRef = this.dialog.open(VehicleDetailsComponent, {
      data: {results: this.vehicles[this.currentPage].results, index: this.selectedRow},
      panelClass: 'my-panel'
    });

    this.vehicleDetailsDialogRef.afterClosed().subscribe(() => {
      this.dialog.closeAll();
    });
   
  }

  fetchPage(page, category = 'vehicles') {
    this.currentPage = page;

    if (this.getData() !== undefined) {
      return;
    }

    this.http.get(`https://swapi.co/api/${category}/?page=${page}`).subscribe(response => {
        this.vehicles[this.currentPage] = response;

        this.saveVechiclesDataObjectInLocalStorage(page)

        this.vehicles[this.currentPage].results.forEach(element => {
           this.saveInLocalStorage(element, element.url);
        });
      });
  }

  handleChange($event) {
    this.fetchPage($event.pageIndex + 1)
  }

  private getData() {
    return this.vehicles[this.currentPage];
   }

   private saveInLocalStorage(element, url) {
    localStorage.setItem(url, JSON.stringify(element));
  }


  private saveVechiclesDataObjectInLocalStorage(page) {
    localStorage.setItem('vehicles, page '+page, JSON.stringify(this.vehicles));
  }

  readFromLocalStorage() {
    const vehiclesFromCache = JSON.parse(localStorage.getItem('vehicles, page '+this.currentPage));

    if (vehiclesFromCache !== null) {
      this.vehicles = vehiclesFromCache;
    }
  }

}
