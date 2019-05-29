import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { keyframes } from '@angular/animations';
import { UrlSegment } from '@angular/router';
import { filterQueryId } from '@angular/core/src/view/util';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {Observable} from 'rxjs/Rx';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  results = [];
  person = null;
  person2 = null;
  selectedPerson = 0;
  single = null;
  data:any = {};
  results2 = []
  urls;
  keyIndex = 0;
  
  newFilms = {};
  newSpecies = {};
  newVehicles = {};
  newStarships = {};
  newPlanets = {};
  newPeople = {};

  filmsDetails = [];
  speciesDetails = [];
  starshipsDetails = [];
  vehiclesDetails = [];
  planetsDetails = [];
  peopleDetails = [];

  httpDetails = [];

  detailsData = {};
  detailsDataEntries = null;

  details = [];
  odp = {};

dupa = null;

  keyForUrl;
  
  filmsData:any = null;
  starshipsData:any = null;
  speciesData:any = null;
  vehiclesData:any = null;
  personData:any = null;
  
   
  constructor(@Inject(MAT_DIALOG_DATA) public peopleData: any,
              public dialog: MatDialog, public http: HttpClient) {
        this.results = peopleData.results;
        this.selectedPerson = peopleData.index;
        console.log("22222222 this.results[this.selectedPerson]: ", this.results[this.selectedPerson])
        this.person = Object.entries(this.results[this.selectedPerson]);
        console.log(this.person);

         this.person.forEach(element => {
                  console.log("element: ",element);
                  console.log("element0: ",element[0])
                  console.log("element1: ",element[1])
                  if(typeof element[0] === 'string' && Array.isArray(element[1])) {
                    console.log("wewnatrz if")
                    console.log("keys",JSON.stringify(Object.keys(element)))
                    console.log("values",Object.values((element)))
                    this.data[element[0]] = element[1];
                    console.log("this.data",this.data)
                    
                  }
                });

        console.log("final data:", this.data)
        this.starshipsData = this.data.starships;
        this.filmsData = this.data.films;
        this.vehiclesData = this.data.vehicles;
        this.speciesData = this.data.species;
        
        console.log("final data[0]:", this.data[0])
        console.log("final data[1]:", this.data[1])
        console.log("entries", Object.entries(this.data))
        let dataEntries = Object.entries(this.data);
        console.log(dataEntries)
        // let dataFromCache;
        // this.retrieveRelatedData();
  }

  ngOnInit() {
    this.showDetails();
  }

  openPrevious() {
    if(this.selectedPerson > 0) {
      this.selectedPerson--;
      this.person = Object.entries(this.results[this.selectedPerson]);
    }
  }

  openNext() {
    if(this.selectedPerson < 10) {
      this.selectedPerson++;
      this.person = Object.entries(this.results[this.selectedPerson]);
    }
  }

  close() {
    this.dialog.closeAll();
  }

  public show() {
    console.log("po kliknieciu w przycisk. stan tabel: ")
    console.log("this.filmsDetails", this.filmsDetails)
    console.log("this.speciesDetails", this.speciesDetails)
    console.log("this.vehiclesDetails", this.vehiclesDetails)
    console.log("this.starshipsDetails", this.starshipsDetails)
   
    console.log("this.filmsData", this.filmsData)
    console.log("this.speciesData", this.speciesData)
    console.log("this.vehiclesData", this.vehiclesData)
    console.log("this.starshipsData", this.starshipsData)

    console.log("this.newFilm", this.newFilms)
    console.log("this.newSpecies", this.newSpecies)
    console.log("this.newVehicles", this.newVehicles)
    console.log("this.newStarships", this.newStarships)

    this.doLogicAfterHttpComes(this.data, this.filmsDetails, this.newFilms, this.filmsData);
    this.doLogicAfterHttpComes(this.data, this.speciesDetails, this.newSpecies, this.speciesData);
    this.doLogicAfterHttpComes(this.data, this.vehiclesDetails, this.newVehicles, this.vehiclesData);
    this.doLogicAfterHttpComes(this.data, this.starshipsDetails, this.newStarships, this.starshipsData);
  }

  public showDetails() {
    this.retrieveFilmDetails();
    this.retrieveSpeciesDetail();
    this.retrieveVechicleDetails();
    this.retrieveStarshipsDetails();
  }

  private retrieveStarshipsDetails() {
    if (this.starshipsData !== undefined) {
      this.starshipsData.map(url => {
        this.retrieveDataFromSource(this.data, this.starshipsData, this.newStarships, this.starshipsDetails, url);
      });
    }
  }

  private retrieveVechicleDetails() {
    if (this.vehiclesData !== undefined) {
      this.vehiclesData.map(url => {
        this.retrieveDataFromSource(this.data, this.vehiclesData, this.newVehicles, this.vehiclesDetails, url);
      });
    }
  }

  private retrieveSpeciesDetail() {
    if (this.speciesData !== undefined) {
      this.speciesData.map(url => {
        this.retrieveDataFromSource(this.data, this.speciesData, this.newSpecies, this.speciesDetails, url);
      });
    }
  }

  private retrieveFilmDetails() {
    if (this.filmsData !== undefined) {
      this.filmsData.map(url => {
        this.retrieveDataFromSource(this.data, this.filmsData, this.newFilms, this.filmsDetails, url);
      });
    }
  }

  private retrieveDataFromSource(data, films, newObject, detailsArray, url) {
    // let dataFromCache = JSON.parse(localStorage.getItem(url));
    // if(dataFromCache !== null) {
    //  console.log("dataFromCache",dataFromCache);
    //  return dataFromCache;
    // //  this.details.push(dataFromCache);
    //  // this.data[films] = dataFromCache;
    // } else {
      this.getAsyncData(data, films, newObject, detailsArray, url);
    //  await this.http.get(url)
    //  .subscribe(response => {
    //    let odp = response;
    //    console.log("response",odp);  
    //    return odp;
    //   //  this.details.push(response);
    //    // this.data[films] = dataFromCache;
    //  });
    // }
  }
  
  private getAsyncData(data, films, newObject, detailsArray, url) {
    
    console.log("1. ### data", data, "### films", films, "### url", url)
    // this.keyForUrl = this.determineProperKey(films, url);
    this.keyForUrl = Object.keys(this.data).forEach(key => {
      if (films[key] === url) {
        console.log("2. films[key]", key);
        return key;
      }
    });
      this.http.get(url).subscribe(response => {
      // this.odp = response;
      this.odp =  Object.assign({}, response);
    

      


      console.log("3. in http, odp:", this.odp),
       detailsArray.push({...this.odp}),
       console.log("detailsArray:", detailsArray);
       let objKey = Object.keys(this.data)[this.keyForUrl];
    //     newObject[objKey] = detailsArray;
      // () =>this.doLogicAfterHttpComes(detailsArray, response, newObject);
  
    });

    console.log("za http, detailsArray:",detailsArray )
    console.log("za http, odp:",this.odp )
    //   this.odp = response;
    //   console.log("odp, line 208",this.odp);  
    //   console.log("RRRRRRRRRRRRRRRRR receive",receive);  
      
    //   detailsArray.push(response);
    //   console.log("detailsArray after push: ",detailsArray)
    //   let objKey = Object.keys(this.data)[keyForUrl];
    //     newObject[objKey] = detailsArray;
    //   console.log("this.newObject: ", newObject);
    //   Object.assign(this.detailsData, ...newObject);
    //   console.log("this.detailsData: ", this.detailsData)
    //   this.detailsDataEntries = Object.entries(this.detailsData)
    //   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx entries: ", Object.entries(this.detailsData))
    //   let firstElem =  this.detailsDataEntries[0]
    //   console.log("firstElem[0]:", firstElem);
    //   console.log("second elem of first elem: ", firstElem[1])
      
    // });
  }

 

  private doLogicAfterHttpComes(data:any, detailsArray: any, newObject: any, objectData: any) {
    if(detailsArray.length >0) {
      console.log("in doLogicAfterHttpComes")
      console.log("data: ", this.data)
      this.keyForUrl = this.determineProperKey(this.data, detailsArray, objectData);
      // detailsArray.push(response);
      let objKey = Object.keys(this.data)[this.keyForUrl];
      newObject[objKey] = detailsArray;
      console.log("4. objKey", objKey);
      console.log("5. newObject[objKey]", newObject[objKey]);
      console.log("6. detailsArray:", detailsArray);
      // console.log("newObject[objKey] = detailsArray;", newObject[objKey])
      Object.assign(this.detailsData, ...newObject);
      console.log("7. this.detailsData", this.detailsData);
      this.detailsDataEntries = Object.entries(this.detailsData);
      console.log("8. this.detailsDataEntries", this.detailsDataEntries);
    }
  }

  private determineProperKey(data:any, detailsArray: any, objectData: any) {
    let values = Object.values(this.data);
    for(let i=0;i<values.length;i++) {
      let data = detailsArray[i];
      console.log(data)
      if (values[i] === data.url) {
         console.log("2. films[key]", values[i]);
          return values[i];
           }
    }
    
    // Object.values(this.data).forEach(key => {
      
    //   if (key === detailsArray.url) {
    //     console.log("2. films[key]", key);
    //     return key;
    //   }
    // });
  }
}
