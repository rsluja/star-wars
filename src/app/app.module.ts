import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component'
import {AppRoutingModule} from './app-routing.module'

import { TableColumnPipe } from './shared/pipes/table-column/table-column.pipe';
import { DetailInfoPipe } from './shared/pipes/detail-info/detail-info.pipe';
import { DetailComponent } from './shared/detail/detail.component';
import { PeopleDetailsComponent } from './starwars/people/people-details/people-details.component';
import { PeopleComponent } from './starwars/people/people.component';
import { VehicleComponent } from './starwars/vehicle/vehicle.component';
import { PlanetComponent } from './starwars/planet/planet.component';
import { FilmsComponent } from './starwars/films/films.component';
import { SpeciesComponent } from './starwars/species/species.component';
import { StarshipsComponent } from './starwars/starships/starships.component';
import { OverviewComponent } from './shared/overview/overview.component';
import { PlanetDetailsComponent } from './starwars/planet/planet-details/planet-details.component';
import { SpeciesDetailsComponent } from './starwars/species/species-details/species-details.component';
import { FilmsDetailsComponent } from './starwars/films/films-details/films-details.component';
import { StarshipsDetailsComponent } from './starwars/starships/starships-details/starships-details.component';
import { VehicleDetailsComponent } from './starwars/vehicle/vehicle-details/vehicle-details.component';
import { PeopleRoutingModule } from './starwars/people/people-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PeopleDetailsComponent,
    PeopleComponent,
    VehicleComponent,
    PlanetComponent,
    ErrorComponent,
    HeaderComponent,
    FilmsComponent,
    SpeciesComponent,
    StarshipsComponent,
    OverviewComponent,
    PlanetDetailsComponent,
    SpeciesDetailsComponent,
    FilmsDetailsComponent,
    StarshipsDetailsComponent,
    VehicleDetailsComponent,
    TableColumnPipe,
    DetailInfoPipe,
    DetailComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule, 
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    PeopleRoutingModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  // providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  entryComponents: [
    PeopleDetailsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
