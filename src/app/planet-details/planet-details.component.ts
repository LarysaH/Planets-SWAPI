import {Component, Input, OnInit} from '@angular/core';
import {Planet} from '../models/planet.model';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  @Input() planet: Planet;

  constructor() { }

  ngOnInit() {
  }

}
