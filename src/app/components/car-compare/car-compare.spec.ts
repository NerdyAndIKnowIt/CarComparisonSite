import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCompareComponent } from './car-compare';

describe('CarCompareComponent', () => {
  let component: CarCompareComponent;
  let fixture: ComponentFixture<CarCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCompareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
