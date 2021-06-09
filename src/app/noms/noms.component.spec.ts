import { FoodService, Dessert } from './../food.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomsComponent } from './noms.component';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { By } from '@angular/platform-browser';

describe('NomsComponent', () => {
  let component: NomsComponent;
  const foodServiceSpy = jasmine.createSpyObj<FoodService>(
    ['getDessert']
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NomsComponent,
        {provide: FoodService, useValue: foodServiceSpy}
      ]
    });
    component = TestBed.inject(NomsComponent);
  });

  it('should filter fishy desserts', (done) => {
    foodServiceSpy.getDessert.and.returnValue(of([
      {name: 'Test', type: 'fishy'},
      {name: 'Test 2', type: 'cake'}
    ]));
    component.ngOnInit();
    component.desserts$?.subscribe(
      noms => {
        expect(noms).toEqual([{name: 'Test 2', type: 'cake'}]);
        done();
      },
      error => done.fail('should return array of desserts')
    )
  });

  it('should filter fishy desserts as stream', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(({cold, expectObservable}) => {
      foodServiceSpy.getDessert.and.returnValue(cold('d', {
        d:
        [{name: 'Test', type: 'fishy'}, {name: 'Test 2', type: 'cake'}]
      }));

      component.ngOnInit();
      expect(component.desserts$).toBeTruthy();
      const expected = {e: [{name: 'Test 2', type: 'cake'}]};
      expectObservable(component.desserts$ as Observable<Dessert[]>)
        .toBe('e', expected)
    });
  });
});


describe('troubling tests', () => {
  let component: NomsComponent;

  const foodServiceSpy = jasmine.createSpyObj<FoodService>(
    ['getDessert']
  );
  foodServiceSpy.getDessert.and.returnValue(of([]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NomsComponent,
        {provide: FoodService, useValue: foodServiceSpy}
      ]
    });
    component = TestBed.inject(NomsComponent);
  });

  it('should act like everything is A-OK', () => {
    expect(component).toBeTruthy();
    component.desserts$?.subscribe(
      noms =>
        expect(noms).toEqual([{name: 'Test 3', type: 'cake'}])
    );
  });

  it('should show as warning', () => {
    foodServiceSpy.getDessert.and.returnValue(NEVER);
    component.ngOnInit();
    component.desserts$?.subscribe(
      noms =>
        expect(noms).toEqual([{name: 'Test 2', type: 'cake'}])
    );
  });

  it('should show an exception', () => {
    foodServiceSpy.getDessert.and.returnValue(throwError('Yipe'));
    component.ngOnInit();
    component.desserts$?.subscribe(
      noms =>
        expect(noms).toEqual([{name: 'Test 2', type: 'cake'}])
    );
  });
});

describe('More troubling tests', () => {
  let fixture: ComponentFixture<NomsComponent>;
  let component: NomsComponent;

  const foodServiceSpy = jasmine.createSpyObj<FoodService>(
    ['getDessert']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NomsComponent],
      providers: [{provide: FoodService, useValue: foodServiceSpy}]
    });

    fixture = TestBed.createComponent(NomsComponent);
    component = fixture.componentInstance;
    foodServiceSpy.getDessert.and.returnValue(of([
      {name: 'Test', type: 'fishy'}, {name: 'Test 2', type: 'cake'}
    ]));
    fixture.detectChanges();
  });

  it('fooled ya!', () => {
    expect(component).toBeTruthy();
    const noms = fixture.debugElement.queryAll(By.css('li'));
    expect(noms.length).toBe(1);

    component.isNomTime?.subscribe(
      nomTime =>
        expect(nomTime).toBe(false)
    );
  });
});
