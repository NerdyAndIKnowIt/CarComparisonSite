import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-selection',
  imports: [FormsModule, CommonModule],
  templateUrl: './car-selection.html',
  styleUrl: './car-selection.css'
})

export class CarSelection {
  selectedMake = '';
  selectedModel = '';
  selectedYear = '';

  makes = ['Toyota', 'Honda', 'Ford'];
  models: string[] = [];
  years: number[] = [];

  submitMake() {

    if (this.selectedMake === 'Toyota') {
      this.models = ['Camry', 'Corolla'];
    }
    if (this.selectedMake === 'Honda') {
      this.models = ['Civic', 'Accord'];
    }
    if (this.selectedMake === 'Ford') {
      this.models = ['F150', 'Mustang'];
    }
  }
  submitModel() {

    this.years = [2020, 2021, 2022];
  }

  submitYear() {
    console.log('Final selection:', {
      make: this.selectedMake,
      model: this.selectedModel,
      year: this.selectedYear
    });
  }
}
