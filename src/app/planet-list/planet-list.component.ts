import {Component, OnInit} from '@angular/core';
import {Planet} from '../models/planet.model';
import {HttpClient} from '@angular/common/http';
import {SortPipe} from '../pipes/sort.pipe';
import {Router} from '@angular/router';
import {PlanetService} from '../services/planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  allPlanets: Planet[] = [];
  planets: Planet[] = [];
  currentPage = 1;
  countPlanets;
  searchValue = '';

  // tslint:disable-next-line:variable-name
  private _pageSize: number;

  get pageSize() {
    return this._pageSize;
  }

  set pageSize(value) {
    this.currentPage = 1;
    this._pageSize = value;
    this.getPlanets();
  }

  constructor(
    protected planetService: PlanetService,
    private httpClient: HttpClient,
    private sortPipe: SortPipe,
    private router: Router
  ) {
    this._pageSize = 10;
  }

  ngOnInit() {
    this.loadAllFromServer();
  }

  private loadAllFromServer() {
    this.planetService.loadAll()
      .subscribe(res => {
        this.allPlanets = res;
        this.sortPlanets();
        this.getPlanets();
      });
  }

  private sortPlanets() {
    this.allPlanets = this.sortPipe.transform(this.allPlanets, 'name');
  }

  /**
   * Sort, filter of allPlanets
   */
  getPlanets() {
    this.planets = [];
    if (this.searchValue) {
      this.planets = this.allPlanets.filter(value => value.name.toLowerCase().includes(this.searchValue.toLowerCase()));
      this.countPlanets = this.planets.length;
      this.planets = this.planets
        .slice((this.currentPage - 1) * +this._pageSize, ((this.currentPage - 1) * +this._pageSize) + +this._pageSize);
    } else {
      this.countPlanets = this.allPlanets.length;
      this.planets = this.allPlanets
        .slice((this.currentPage - 1) * +this._pageSize, ((this.currentPage - 1) * +this._pageSize) + +this._pageSize);
    }
  }

  onClickPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.getPlanets();
  }

  onClickNextPage() {
    this.currentPage = this.currentPage + 1;
    this.getPlanets();
  }

  onClickDetails(planet: Planet) {
    const id = +planet.url.replace('https://swapi.co/api/planets/', '').replace('/', '');
    this.router.navigate(['planets', id]);
  }
}
