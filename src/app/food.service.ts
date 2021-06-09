import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type DessertType = 'cake' | 'frozen' | 'fishy';
export interface Dessert {
  type: DessertType;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly desserts: Dessert[] = [
    { name: '🍰', type: 'cake' },
    { name: '🍦', type: 'frozen'},
    { name: '🍥', type: 'fishy'}
  ]

  constructor() { }

  getDessert(): Observable<Dessert[]> {
    return of(this.desserts);
  }
}
