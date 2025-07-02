import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selection',
  imports: [CommonModule],
  templateUrl: './selection.html',
  styleUrl: './selection.css'
})
export class Selection {
  activated: boolean = true;
}
