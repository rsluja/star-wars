import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  results = [];
  person = null;
  selectedPerson = 0;
  data:any = {};

  filmsDetails = [];
  speciesDetails = [];
  starshipsDetails = [];
  vehiclesDetails = [];
  planetsDetails = [];
  peopleDetails = [];

  visible:boolean = false;

  odp = {};
  filmsData:any = null;
  starshipsData:any = null;
  speciesData:any = null;
  vehiclesData:any = null;
  personData:any = null;
  planetsData:any = null;

  species = {} 
  starships = {} 
  vehicles = {}
  films = {}
  planets = {}
  people = {}

   
  constructor(@Inject(MAT_DIALOG_DATA) public peopleData: any,
              public dialog: MatDialog, public http: HttpClient) {
        this.results = peopleData.results;
        this.selectedPerson = peopleData.index;
        this.processData();
        this.showDetails();
  }

  private processData() {
    this.person = Object.entries(this.results[this.selectedPerson]);
    this.person.forEach(element => {
      if (typeof element[0] === 'string' && Array.isArray(element[1])) {
        this.data[element[0]] = element[1];
      }
    });
    this.starshipsData = this.data.starships;
    this.filmsData = this.data.films;
    this.vehiclesData = this.data.vehicles;
    this.speciesData = this.data.species;
    this.planetsData = this.data.planets;
  }

  ngOnInit() {
    this.processData();
    this.showDetails();
  }

  openPrevious() {
    this.visible = false;
    if(this.selectedPerson > 0) {
      this.selectedPerson--;
      this.person = Object.entries(this.results[this.selectedPerson]);
      this.processData();
      this.showDetails();
    }
  }

  openNext() {
    this.visible = false;
    if(this.selectedPerson < 10) {
      this.selectedPerson++;
      this.person = Object.entries(this.results[this.selectedPerson]);
      this.processData();
      this.showDetails();
    }
  }

  close() {
    this.dialog.closeAll();
  }

  public show() {
    
    this.species = Object.assign(this.species, {species:"species", data:this.speciesDetails})
    this.starships = Object.assign(this.starships, {starships:"starships", data:this.starshipsDetails})
    this.vehicles = Object.assign(this.vehicles, {vehicles:"vehicles", data:this.vehiclesDetails})
    this.planets = Object.assign(this.planets, {planets:"planets", data:this.planetsDetails})
    this.people = Object.assign(this.people, {people:"people", data:this.peopleDetails})
    this.films = Object.assign(this.films, {films:"films", data:this.filmsDetails})
    
    this.visible = !this.visible;
  }

  public showDetails() {
    this.retrieveFilmDetails();
    this.retrieveSpeciesDetail();
    this.retrieveVechicleDetails();
    this.retrieveStarshipsDetails();
  }

  private retrieveStarshipsDetails() {
    this.starshipsDetails = [];
    if (this.starshipsData !== undefined) {
      this.starshipsData.map(url => {
        this.retrieveDataFromSource(this.starshipsDetails, url);
      });
    }
  }

  private retrieveVechicleDetails() {
    this.vehiclesDetails = [];
    if (this.vehiclesData !== undefined) {
      this.vehiclesData.map(url => {
        this.retrieveDataFromSource(this.vehiclesDetails, url);
      });
    }
  }

  private retrieveSpeciesDetail() {
    this.speciesDetails = [];
    if (this.speciesData !== undefined) {
      this.speciesData.map(url => {
        this.retrieveDataFromSource(this.speciesDetails, url);
      });
    }
  }

  private retrieveFilmDetails() {
    this.filmsDetails = [];
    if (this.filmsData !== undefined) {
      this.filmsData.map(url => {
        this.retrieveDataFromSource( this.filmsDetails, url);
      });
    }
  }

  private retrieveDataFromSource(detailsArray, url) {
    this.http.get(url).subscribe(response => {
      this.odp = response;
      this.odp =  Object.assign({}, response);
      detailsArray.push({...this.odp});
    });
  }
}
