import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Planet} from '../models/planet.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  url = 'https://swapi.co/api/planets/';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getPlanetDetails(id) {
    return this.httpClient.get<Planet>(this.url + id);
  }

  loadAll(): Observable<Planet[]> {
    return Observable.create(observer => {
      const allPlanets = [];
      let countPlanets;
      this.httpClient.get<{ results: Planet[], count: number }>(this.url)
        .subscribe(data => {
          countPlanets = data.count;
          for (let i = 1; i < countPlanets / 10 + 1; i++) {
            this.httpClient.get<{ results: Planet[], count: number }>(this.url + '?page=' + i)
              .subscribe(subData => {
                allPlanets.push(...subData.results);
                if (allPlanets.length === countPlanets) {
                  observer.next(allPlanets);
                }
              });
          }
        });
    });
  }
}
