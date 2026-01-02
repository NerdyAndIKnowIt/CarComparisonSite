import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarSelection } from "./car-selection/car-selection";
import { CarView } from "./car-view/car-view";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarSelection, CarView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'CarComparisonSite';
}
