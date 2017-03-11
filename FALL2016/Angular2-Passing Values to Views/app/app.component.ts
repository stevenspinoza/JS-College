import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-comp',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.css' ]  
})
export class AppComponent {
  title = 'AppComponent Title';
  text = 'Some descriptive text';  
  showSec:string = 'Parent data';

  getTitle(){
    this.title = 'AppComponent Title';
	  //this.showSec = 'show';
  }
  showComp(){
	  this.showSec = 'show';
  }
  
}