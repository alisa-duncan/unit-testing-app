import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LunchComponent } from './lunch.component';

@Component({selector: 'app-simple'})
class SimpleComponentStub{}

describe('LunchComponent', () => {
  let component: LunchComponent;
  let fixture: ComponentFixture<LunchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LunchComponent,
        SimpleComponentStub
      ]
    });

    fixture = TestBed.createComponent(LunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
