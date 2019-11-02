import {Component, OnInit} from '@angular/core';
import {Planet} from '../models/planet.model';
import {HttpClient} from '@angular/common/http';
import {SortPipe} from '../pipes/sort.pipe';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  localUrl = 'https://swapi.co/api/planets/';

  allPlanets: Planet[] = [];
  planets: Planet[] = [];
  currentPage = 1;
  countPlanets;
  searchValue = '';
  selectedPlanet: Planet;

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
    private httpClient: HttpClient,
    private sortPipe: SortPipe,
  ) {
    this._pageSize = 10;
  }

  ngOnInit() {
    this.loadAllFromServer();
  }

  private loadAllFromServer() {
    this.httpClient
      .get<{ results: Planet[], count: number }>(this.localUrl)
      .subscribe(data => {
        this.countPlanets = data.count;
        for (let i = 1; i < this.countPlanets / this._pageSize + 1; i++) {
          this.httpClient
            .get<{ results: Planet[], count: number }>(this.localUrl + '?page=' + i)
            .subscribe(subData => {
              this.allPlanets.push(...subData.results);
              if (this.allPlanets.length === this.countPlanets) {
                this.preparePlanets();
                this.getPlanets();
              }
            });
        }
      });
  }

  private preparePlanets() {
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
      this.planets = this.planets.slice((this.currentPage - 1) * +this._pageSize, ((this.currentPage - 1) * +this._pageSize) + +this._pageSize);
    } else {
      this.countPlanets = this.allPlanets.length;
      this.planets = this.allPlanets.slice((this.currentPage - 1) * +this._pageSize, ((this.currentPage - 1) * +this._pageSize) + +this._pageSize);
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
    this.selectedPlanet = planet;
  }
}
