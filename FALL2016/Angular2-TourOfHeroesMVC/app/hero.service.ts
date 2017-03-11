import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { stdClass } from './stdClass';
//import { HEROES } from './mock-heroes';
import { Headers, Http, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {
	
	//private heroesUrl = 'app/heroes';
	//private heroesUrl = 'http://localhost:3000/heroes?callback=JSONP_CALLBACK';
	private heroesUrl = 'https://php.scweb.ca/web595/api/heroes';
	//private heroesUrl = 'http://localhost:3000/app/heroes.json';
	private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
	
	//constructor(private jsonp: Jsonp) { }
	
	constructor(private http: Http) { }
	
	//Using Promises
	//getHeroes(): Promise<Hero[]> {
	//	return Promise.resolve(HEROES);
	//}
	
	// let params = new URLSearchParams();
    // params.set('search', term); // the user's search value    
    // params.set('format', 'json');
    // params.set('callback', 'JSONP_CALLBACK');
	
	//let queryString = `&callback=JSONP_CALLBACK`;
	
	// getHeroes(): Promise<Hero[]> {
		// //let x = this.jsonp.get(this.heroesUrl)
		// return this.jsonp.get(this.heroesUrl)
				   // .toPromise()
				   // .then(response => response.json().data as Hero[])
				   // .catch(this.handleError);
		// //console.log(x);
	// }
	
	
	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
				   .toPromise()
				   .then(response => response.json())
				   .catch(this.handleError);
	}
	
		
	
	getHero(id: number): Promise<Hero> {
	  return this.getHeroes()
				 .then(heroes => heroes.find(hero => hero.id === id));
	}
	
	update(hero: Hero): Promise<Hero> {
		
	let urlSearchParams = new URLSearchParams();		
		//urlSearchParams.append('id', hero.id);
		urlSearchParams.append('name', hero.name);
		urlSearchParams.append('age', hero.age.toString());
		urlSearchParams.append('ability', hero.ability);
		let body = urlSearchParams.toString()
	
	  const url = `${this.heroesUrl}/${hero.id}`;
	  return this.http
		.put(url, body, {headers: this.headers})
		.toPromise()
		.then(() => hero)
		.catch(this.handleError);
	}
	
	//Original Create
	// create(name: string): Promise<Hero> {
	  // return this.http
		// .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
		// .toPromise()
		// .then(res => res.json().data)
		// .catch(this.handleError);
	// }	
	
	
	create(name: string, age: number, ability: string): Promise<Hero> {
	  
	  let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('name', name);
		urlSearchParams.append('age', age.toString());
		urlSearchParams.append('ability', ability);
		let body = urlSearchParams.toString();
	  
	  // const url = `${this.heroesUrl}/${id}`;
	  // let body = {id: id, name: name, age: 0, ability: ''};
	  
	  return this.http
		.post(this.heroesUrl, body, {headers: this.headers})
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
	}	
	
	
	// create(name: string, id: number): Promise<Hero> {
		// let newHero: Hero = {id: id, name: name, age: 0, ability: ''};
		
		// let body = JSON.stringify(newHero);
		
	  // return this.http
		// .post(this.heroesUrl, 
		// body, {headers: this.headers})
		// .toPromise()
		// .then(res => res.json())
		// .catch(this.handleError);
	// }

	// create(name: string, id: number): {
	  
	// let headers = this.headers;
	// let options = new RequestOptions({ headers: this.headers });
	// let body = {id: id, name: name, age: 0, ability: ''};
	  
	  // return this.http
		// .post(this.heroesUrl, body
		// , headers)
		// .map((res: Response) => res.json());
	// }

	
	
	delete(id: number): Promise<void> {
	  const url = `${this.heroesUrl}/${id}`;
	  return this.http.delete(url, {headers: this.headers})
		.toPromise()
		.then(() => null)
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
	
	
}