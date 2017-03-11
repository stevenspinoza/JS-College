import { Input, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sec-comp',
  templateUrl: 'sec.component.html',
  styleUrls: [ 'sec.css' ]  
})
export class SecComponent {
  @Input()
  title = 'SecondComponent Title';
  text = 'Other descriptive text';
  
  //@Input()
  showSec:string; 
  
  getTitle(){
      this.title = 'SecondComponent Title';	  
  }
  
}