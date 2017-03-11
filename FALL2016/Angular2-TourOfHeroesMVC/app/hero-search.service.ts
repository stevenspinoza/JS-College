import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Hero }           from './hero';
@Injectable()
export class HeroSearchService {

  private heroesUrl = 'https://php.scweb.ca/web595/api/heroes/';
  //const url = `${this.heroesUrl}/${hero.id}`;
	
  constructor(private http: Http) {}
  search(term: string): Observable<Hero[]> {
    return this.http
               .get(this.heroesUrl + `id?name=${term}`)
               .map((r: Response) => r.json());
  }
}
