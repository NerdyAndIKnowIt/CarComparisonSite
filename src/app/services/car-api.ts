import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../car-api-service/car';

@Injectable({
  providedIn: 'root',
})
export class CarApi {
  private apiUrl = 'https://gh1pq1wp42.execute-api.us-east-1.amazonaws.com/prod/cars';

  constructor(private http: HttpClient) {}

  getAllCars() {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarsByMake(make: string) {
    return this.http.get<Car[]>(`${this.apiUrl}/${make}`);
  }

  getCarsByMakeModel(make: string, model: string) {
    return this.http.get<Car[]>(`${this.apiUrl}/${make}/${model}`);
  }
}
