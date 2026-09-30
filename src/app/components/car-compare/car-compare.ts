import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarApi } from '../../services/car-api';
import { Car } from '../../car-api-service/car';

@Component({
  selector: 'app-car-compare',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-compare.html',
  styleUrl: './car-compare.css'
})
export class CarCompareComponent implements OnInit {

  // --- Dropdown Data ---
  allCars: Car[] = [];

  makes: string[] = [];

  modelsCar1: string[] = [];
  modelsCar2: string[] = [];

  // --- Selected Values ---
  selectedMake1 = '';
  selectedMake2 = '';

  selectedModel1 = '';
  selectedModel2 = '';

  // --- Final Selected Cars ---
  car1?: Car;
  car2?: Car;

  constructor(private carApi: CarApi) {}

  ngOnInit(): void {
    this.loadMakes();
  }

  // Load all cars once
  loadMakes(): void {
    this.carApi.getAllCars().subscribe(data => {
      this.allCars = data;

      const uniqueMakes = new Set(data.map(c => c.Make));
      this.makes = Array.from(uniqueMakes).sort();
    });
  }

  // When user selects a make, auto-load its models and reset downstream state
  onMakeChange(carNumber: number): void {
    const make = carNumber === 1 ? this.selectedMake1 : this.selectedMake2;

    // Reset downstream selections for this car
    if (carNumber === 1) {
      this.selectedModel1 = '';
      this.modelsCar1 = [];
      this.car1 = undefined;
    } else {
      this.selectedModel2 = '';
      this.modelsCar2 = [];
      this.car2 = undefined;
    }

    if (!make) return;

    this.carApi.getCarsByMake(make).subscribe(data => {
      const uniqueModels = new Set(data.map(c => c.Model));
      const models = Array.from(uniqueModels).sort();

      if (carNumber === 1) {
        this.modelsCar1 = models;
      } else {
        this.modelsCar2 = models;
      }
    });
  }

  // Enable compare only when both makes and both models are selected
  canCompare(): boolean {
    return !!this.selectedMake1 && !!this.selectedModel1
      && !!this.selectedMake2 && !!this.selectedModel2;
  }

  // When user clicks the single compare button, load both cars
  compareCars(): void {
    if (!this.canCompare()) return;
    this.loadCar(1);
    this.loadCar(2);
  }

  // Build the Day resized image URL, e.g. /pictures/resized/BugattiChironDayResized.png
  carImageDay(car: Car): string {
    return `/pictures/resized/${this.imageKey(car)}DayResized.png`;
  }

  // Build the Night resized image URL, e.g. /pictures/resized/BugattiChironNightResized.png
  carImageNight(car: Car): string {
    return `/pictures/resized/${this.imageKey(car)}NightResized.png`;
  }

  // Strip spaces from make + model to match the resized file naming
  private imageKey(car: Car): string {
    return `${car.Make.replace(/\s+/g, '')}${car.Model.replace(/\s+/g, '')}`;
  }

  // Fetch a single car's details from the API
  loadCar(carNumber: number): void {
    const make  = carNumber === 1 ? this.selectedMake1  : this.selectedMake2;
    const model = carNumber === 1 ? this.selectedModel1 : this.selectedModel2;

    if (!make || !model) return;

    this.carApi.getCarsByMakeModel(make, model).subscribe(data => {
      if (carNumber === 1) {
        this.car1 = data[0];
      } else {
        this.car2 = data[0];
      }
    });
  }
}