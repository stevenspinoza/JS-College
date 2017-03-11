import { Component, Input } from '@angular/core';
import { Keypad } from './keypad';


export class Keypad {
  id: number;
  name: string;
}

@Component({
  selector: 'my-keypad-detail',
})
export class KeypadDetailComponent {
	keypad: Keypad;

}