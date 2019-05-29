import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';
import { StarshipsDetailsComponent } from './starships-details/starships-details.component';
import { StarshipsComponent } from './starships.component';
import { AppModule } from 'src/app/app.module';

@NgModule({
  imports: [
    AppModule,
    StarshipsDetailsComponent,
    StarshipsComponent
  ],
  declarations: [
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    StarshipsDetailsComponent
  ]
})
export class StarshipsModule { }
