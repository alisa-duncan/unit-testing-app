import { PizzaService } from './../pizza.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaDepComponent } from './pizza-dep.component';

describe('PizzaDepComponent', () => {
  let component: PizzaDepComponent;
  let fixture: ComponentFixture<PizzaDepComponent>;

  const pizzaSpy = jasmine.createSpyObj<PizzaService>(
    ['getPizza']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaDepComponent ],
      providers: [{
        provide: PizzaService,
        useValue: pizzaSpy
      }]
    });

    fixture = TestBed.createComponent(PizzaDepComponent);
    component = fixture.componentInstance;
  });
});

describe('Component with deps', () => {
  it('should count pizza slices', () => {
    const pizzaSpy =
      jasmine.createSpyObj<PizzaService>(['getPizza']);
    pizzaSpy.getPizza.and.returnValue('🫓')

    const comp = new PizzaDepComponent(pizzaSpy);
    expect(comp.sliceCounter).toBe(0);
    comp.getPizza();
    expect(comp.sliceCounter).toBe(1);
  });
});

describe('Component with deps and TestBed', () => {
  let comp: PizzaDepComponent;
  const pizzaSpy =
  jasmine.createSpyObj<PizzaService>(['getPizza']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PizzaDepComponent,
        {provide: PizzaService, useValue: pizzaSpy}
      ]
    });

    comp = TestBed.inject(PizzaDepComponent);
  });

  it('should count pizza slices', () => {
    pizzaSpy.getPizza.and.returnValue('🫓')

    expect(comp.sliceCounter).toBe(0);
    comp.getPizza();
    expect(comp.sliceCounter).toBe(1);
  });
});

class FakePizzaService {
  public getPizza(): string {
    return '🫓'
  }
}
describe('Pizza component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PizzaDepComponent,
        {
          provide: PizzaService,
          useClass: FakePizzaService
        }
      ]
    });
  });
});

describe('Pizza component', () => {
  const fakePizzaService =
    jasmine.createSpyObj<PizzaService>([
      'getPizza'
    ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PizzaDepComponent,
        {
          provide: PizzaService,
          useValue: fakePizzaService
        }
      ]
    });
  });
});

class BetterPizzaService {
  public getPizza(): string {
    return '🍕🍕'
  }
}
describe('Pizza component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PizzaDepComponent,
        {
          provide: PizzaService,
          useExisting: BetterPizzaService
        }
      ]
    });
  });
});


class UserService {
  public name: string|undefined;
}
class BestPizzaService {
  constructor(private user: UserService){}
  public getPizza(): string {
    return this.user.name === 'Alisa' ?
        '🍕🍷' : '🍕';
  }
}
describe('Pizza component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PizzaDepComponent,
        {
          provide: PizzaService,
          useFactory: (usr:UserService) =>
            new BestPizzaService(usr),
            deps: [UserService]
        }
      ]
    });
  });
});
