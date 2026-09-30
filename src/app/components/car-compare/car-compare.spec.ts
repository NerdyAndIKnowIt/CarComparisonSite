import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CarCompareComponent } from './car-compare';
import { CarApi } from '../../services/car-api';
import { Car } from '../../car-api-service/car';

function makeCar(make: string, model: string): Car {
  return {
    Make: make,
    Model: model,
    Engine: 'V6',
    Powertrain: 'RWD',
    Transmission: 'Auto',
    YearStart: 2020,
    YearEnd: 2024,
    Horsepower: 300,
    Weight: 3500,
    ZeroToSixty: '5.0',
  };
}

describe('CarCompareComponent', () => {
  let component: CarCompareComponent;
  let fixture: ComponentFixture<CarCompareComponent>;
  let carApiSpy: jasmine.SpyObj<CarApi>;

  beforeEach(async () => {
    carApiSpy = jasmine.createSpyObj<CarApi>('CarApi', [
      'getAllCars',
      'getCarsByMake',
      'getCarsByMakeModel',
    ]);

    // ngOnInit -> loadMakes -> getAllCars
    carApiSpy.getAllCars.and.returnValue(of([makeCar('Toyota', 'Corolla')]));

    await TestBed.configureTestingModule({
      imports: [CarCompareComponent],
      providers: [{ provide: CarApi, useValue: carApiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads unique sorted models and resets downstream state when a make is selected', () => {
    // Pre-set stale downstream state to confirm it is reset
    component.selectedModel1 = 'OldModel';
    component.car1 = makeCar('Toyota', 'OldModel');

    carApiSpy.getCarsByMake.and.returnValue(
      of([
        makeCar('Toyota', 'Supra'),
        makeCar('Toyota', 'Corolla'),
        makeCar('Toyota', 'Corolla'), // duplicate
      ])
    );

    component.selectedMake1 = 'Toyota';
    component.onMakeChange(1);

    expect(carApiSpy.getCarsByMake).toHaveBeenCalledWith('Toyota');
    expect(component.modelsCar1).toEqual(['Corolla', 'Supra']);
    expect(component.selectedModel1).toBe('');
    expect(component.car1).toBeUndefined();
  });

  it('canCompare is false until all makes and models are selected', () => {
    component.selectedMake1 = 'Toyota';
    component.selectedModel1 = 'Supra';
    component.selectedMake2 = 'Honda';
    component.selectedModel2 = '';
    expect(component.canCompare()).toBeFalse();

    component.selectedModel2 = 'Civic';
    expect(component.canCompare()).toBeTrue();
  });

  it('compareCars loads both cars when all selections are made', () => {
    component.selectedMake1 = 'Toyota';
    component.selectedModel1 = 'Supra';
    component.selectedMake2 = 'Honda';
    component.selectedModel2 = 'Civic';

    carApiSpy.getCarsByMakeModel.and.callFake((make: string, model: string) =>
      of([makeCar(make, model)])
    );

    component.compareCars();

    expect(carApiSpy.getCarsByMakeModel).toHaveBeenCalledWith('Toyota', 'Supra');
    expect(carApiSpy.getCarsByMakeModel).toHaveBeenCalledWith('Honda', 'Civic');
    expect(component.car1).toEqual(makeCar('Toyota', 'Supra'));
    expect(component.car2).toEqual(makeCar('Honda', 'Civic'));
  });

  it('compareCars does nothing when selections are incomplete', () => {
    component.selectedMake1 = 'Toyota';
    component.selectedModel1 = 'Supra';
    component.selectedMake2 = '';
    component.selectedModel2 = '';

    component.compareCars();

    expect(carApiSpy.getCarsByMakeModel).not.toHaveBeenCalled();
  });

  it('clears models and makes no API call when the make is empty', () => {
    component.modelsCar1 = ['Supra'];
    component.selectedMake1 = '';

    component.onMakeChange(1);

    expect(carApiSpy.getCarsByMake).not.toHaveBeenCalled();
    expect(component.modelsCar1).toEqual([]);
    expect(component.selectedModel1).toBe('');
    expect(component.car1).toBeUndefined();
  });
});
