import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';

import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { SortPipe } from './pipes/sort.pipe';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailsComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    SortPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
