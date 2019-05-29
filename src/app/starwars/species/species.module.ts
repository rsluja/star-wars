import { NgModule } from '@angular/core';
import { SpeciesDetailsComponent } from './species-details/species-details.component';
import { SpeciesComponent } from './species.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [
    AppModule,
    SpeciesDetailsComponent,
    SpeciesComponent
  ],
  declarations: [
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    SpeciesDetailsComponent
  ]
})
export class SpeciesModule { }
