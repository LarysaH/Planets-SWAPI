import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PlanetListComponent} from './planet-list/planet-list.component';
import {PlanetDetailsComponent} from './planet-details/planet-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'planets', pathMatch: 'full' },
  { path: 'planets', component: PlanetListComponent },
  { path: 'planets/:id', component: PlanetDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
