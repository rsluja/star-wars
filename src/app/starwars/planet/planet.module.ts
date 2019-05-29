import { NgModule } from '@angular/core';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { PlanetComponent } from './planet.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [
    AppModule,
    PlanetDetailsComponent,
    PlanetComponent
  ],
  declarations: [
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    PlanetDetailsComponent
  ]
})
export class PlanetModule { }
