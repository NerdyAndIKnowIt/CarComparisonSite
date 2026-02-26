import { TestBed } from '@angular/core/testing';

import { CarApi } from './car-api';

describe('CarApi', () => {
  let service: CarApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
