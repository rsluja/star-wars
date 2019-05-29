import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { PeopleComponent } from './starwars/people/people.component';
import { PeopleDetailsComponent } from './starwars/people/people-details/people-details.component';
import { PlanetComponent } from './starwars/planet/planet.component';
import { PlanetDetailsComponent } from './starwars/planet/planet-details/planet-details.component';
import { FilmsComponent } from './starwars/films/films.component';
import { FilmsDetailsComponent } from './starwars/films/films-details/films-details.component';
import { SpeciesComponent } from './starwars/species/species.component';
import { SpeciesDetailsComponent } from './starwars/species/species-details/species-details.component';
import { VehicleComponent } from './starwars/vehicle/vehicle.component';
import { VehicleDetailsComponent } from './starwars/vehicle/vehicle-details/vehicle-details.component';
import { StarshipsComponent } from './starwars/starships/starships.component';
import { StarshipsDetailsComponent } from './starwars/starships/starships-details/starships-details.component';

const routes: Routes = [
    {
      path: '',
      // component: PeopleComponent,
      redirectTo: '/people',
      pathMatch: 'full'
    },
    {
      path: 'people',
      component: PeopleComponent,
      children: [
        {
        path: ':id',
        component: PeopleDetailsComponent
        }
      ]
    },
    {
      path: 'planets',
      component: PlanetComponent,
      children: [
        {
        path: ':id',
        component: PlanetDetailsComponent
        }
      ]
    },
    {
      path: 'films',
      component: FilmsComponent,
      children: [
        {
        path: ':id',
        component: FilmsDetailsComponent
        }
      ]
    },
    {
      path: 'species',
      component: SpeciesComponent,
      children: [
        {
        path: ':id',
        component: SpeciesDetailsComponent
        }
      ]
    },
    {
      path: 'vehicles',
      component: VehicleComponent,
      children: [
        {
        path: ':id',
        component: VehicleDetailsComponent
        }
      ]
    },
    {
      path: 'starships',
      component: StarshipsComponent,
      children: [
        {
        path: ':id',
        component: StarshipsDetailsComponent
        }
      ]
    },
        {
      path: '404',
      component: ErrorComponent
    },
    // {
    //   path: '**',
    //   redirectTo: '/404'
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }