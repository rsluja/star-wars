import { NgModule } from '@angular/core';
import { FilmsDetailsComponent } from './films-details/films-details.component';
import { FilmsComponent } from './films.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [
    AppModule,
    FilmsDetailsComponent,
    FilmsComponent
  ],
  declarations: [
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    FilmsDetailsComponent
  ]
})
export class FilmsModule { }
