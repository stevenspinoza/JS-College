"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
//import { HEROES } from './mock-heroes';
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var HeroService = (function () {
    //constructor(private jsonp: Jsonp) { }
    function HeroService(http) {
        this.http = http;
        //private heroesUrl = 'app/heroes';
        //private heroesUrl = 'http://localhost:3000/heroes?callback=JSONP_CALLBACK';
        this.heroesUrl = 'https://php.scweb.ca/web595/api/heroes';
        //private heroesUrl = 'http://localhost:3000/app/heroes.json';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }
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
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        return this.getHeroes()
            .then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
    };
    HeroService.prototype.update = function (hero) {
        var urlSearchParams = new http_1.URLSearchParams();
        //urlSearchParams.append('id', hero.id);
        urlSearchParams.append('name', hero.name);
        urlSearchParams.append('age', hero.age.toString());
        urlSearchParams.append('ability', hero.ability);
        var body = urlSearchParams.toString();
        var url = this.heroesUrl + "/" + hero.id;
        return this.http
            .put(url, body, { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    //Original Create
    // create(name: string): Promise<Hero> {
    // return this.http
    // .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    // .toPromise()
    // .then(res => res.json().data)
    // .catch(this.handleError);
    // }	
    HeroService.prototype.create = function (name, age, ability) {
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('name', name);
        urlSearchParams.append('age', age.toString());
        urlSearchParams.append('ability', ability);
        var body = urlSearchParams.toString();
        // const url = `${this.heroesUrl}/${id}`;
        // let body = {id: id, name: name, age: 0, ability: ''};
        return this.http
            .post(this.heroesUrl, body, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
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
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map