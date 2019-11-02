import {Component, OnInit} from '@angular/core';
import {Planet} from '../models/planet.model';
import {PlanetService} from '../services/planet.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  planet: Planet;

  constructor(
    protected planetService: PlanetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPlanet();
  }

  private getPlanet() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.planetService.getPlanetDetails(id).subscribe(
      res => {
        this.planet = res;
      }
    );
  }

  onClickBack() {
    window.history.back();
  }
}
