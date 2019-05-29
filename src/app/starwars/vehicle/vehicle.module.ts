import { NgModule } from '@angular/core';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleComponent } from './vehicle.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [
    AppModule,
    VehicleDetailsComponent,
    VehicleComponent
  ],
  declarations: [
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    VehicleDetailsComponent
  ]
})
export class VehicleModule { }
