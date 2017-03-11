import { Component } from '@angular/core';
import { Keypad } from './keypad';

const KEYPAD: Keypad[] = [
  { id: 0, value: 0 },
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 6 },
  { id: 8, value: 7 },
  { id: 9, value: 8 },
  { id: 0, value: 9 }
];


export class FirstInput {
  value: number;
}

export class SecondInput {
  value: number;
}


@Component({
  selector: 'my-template',
  template: `
  <h1 class="title">{{title}}</h1>
  <h2 class="result">{{(firstInput.value*0.621371) +(secondInput.value*0.621371)}} mi</h2>
  <div>
      <label>Distance One: </label>
      <input [(ngModel)]="firstInput.value" placeholder="0" class="form-control" > km
  </div>
  <div>
      <label>Distance Two: </label>
      <input [(ngModel)]="secondInput.value" placeholder="0" class="form-control" > km
  </div>
  `,
styles: [`
  .title {
    color: red;
  }
  .result{
    color: blue;
  }
  `
  ]

})
export class AppComponent { 
  title = 'Two Distances from Km to Mi';
  keypad: Keypad;

  firstInput: FirstInput = { value: 0};
  secondInput: SecondInput = { value: 0};

}
