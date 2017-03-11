import './rxjs-extensions';
import 'rxjs/add/operator/toPromise';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }   from './app.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent }  from './hero-search.component';
import { HeroService }         from './hero.service';
import { routing } from './app.routing';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, DashboardComponent, HeroDetailComponent, HeroesComponent, HeroSearchComponent ],
  providers: [ HeroService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
