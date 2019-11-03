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
  isLoading = false;


  constructor(
    protected planetService: PlanetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPlanet();
  }

  private getPlanet() {
    this.isLoading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.planetService.getPlanetDetails(id).subscribe(
      res => {
        this.planet = res;
        this.isLoading = false;
      }
    );
  }

  onClickBack() {
    window.history.back();
  }
}
