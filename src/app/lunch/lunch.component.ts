import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lunch',
  template: `
    <h1>What's for lunch today, {{name}}?</h1>
    <app-simple></app-simple>
  `
})
export class LunchComponent {
  @Input() public name = '';

  constructor() { }
}
