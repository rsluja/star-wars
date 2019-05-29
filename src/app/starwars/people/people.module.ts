import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { PeopleRoutingModule } from './people-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PeopleComponent } from './people.component';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppModule } from 'src/app/app.module';

@NgModule({
    declarations: [
      CommonModule,
      AppModule,
      PeopleDetailsComponent,
      PeopleComponent
    ],
    imports: [
      PeopleRoutingModule,
      HttpClientModule,
      MatProgressSpinnerModule,
      BrowserAnimationsModule
    ],
    providers: [
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
    ],
    entryComponents: [
      PeopleDetailsComponent
    ]
  })
  export class PeopleModule { }