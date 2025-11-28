import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelection } from './car-selection';

describe('CarSelection', () => {
  let component: CarSelection;
  let fixture: ComponentFixture<CarSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
