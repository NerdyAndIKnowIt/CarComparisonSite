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

  // When user clicks load models
  loadModels(carNumber: number): void {
    const make = carNumber === 1 ? this.selectedMake1 : this.selectedMake2;

    if (!make) return;

    this.carApi.getCarsByMake(make).subscribe(data => {
      const uniqueModels = new Set(data.map(c => c.Model));
      const models = Array.from(uniqueModels).sort();

      if (carNumber === 1) {
        this.modelsCar1 = models;
        this.car1 = undefined;
      } else {
        this.modelsCar2 = models;
        this.car2 = undefined;
      }
    });
  }

  // When user clicks compare
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