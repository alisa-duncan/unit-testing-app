import { FoodService, DessertType, Dessert } from './../food.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-noms',
  template: `
    <h1>Noms are 😋</h1>
    <ng-container *ngIf="desserts$ | async as desserts">
      <p>Time to eat<p>
      <ul>
        <li *ngFor="let dessert of desserts">{{dessert.name}}</li>
      </ul>
    </ng-container>
  `
})
export class NomsComponent implements OnInit {
  public desserts$: Observable<Dessert[]> | undefined;
  @Output() public isNomTime = new EventEmitter<boolean>();

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.desserts$ =
      this.foodService.getDessert().pipe(
        map((d: Dessert[]) => d.filter(e => e.type !== 'fishy'))
      );

    this.isNomTime.emit(true);
  }
}
