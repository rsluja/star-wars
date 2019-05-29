import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const personRoutes: Routes = [
    // {
    //     path: ':id',
    //     component: PersonDetailsComponent
    // }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(personRoutes)],
    exports: [RouterModule]
  })
  export class PeopleRoutingModule { }
