import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarCompareComponent } from "./components/car-compare/car-compare";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarCompareComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'CarComparisonSite';
}
