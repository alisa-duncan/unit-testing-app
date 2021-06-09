import { Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
})
export class SimpleComponent {

  constructor() { }

  public isPizza(val: string): boolean {
    return val === '🍕';
  }
}
