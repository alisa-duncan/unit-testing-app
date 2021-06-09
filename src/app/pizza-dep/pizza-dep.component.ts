import { PizzaService } from './../pizza.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pizza-dep',
  template: `
    <button (click)="getPizza()">Pizza me!</button>
    <p>I ate {{sliceCounter}} pizza!</p>
  `
})
export class PizzaDepComponent {

  constructor(private service: PizzaService) { }

  public sliceCounter = 0;

  public getPizza(): string {
    this.sliceCounter++;
    return this.service.getPizza();
  }
}
